import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertChatMessageSchema } from "@shared/schema";
import { WebSocketServer } from "ws";

interface WSClient {
  id: string;
  ws: any;
}

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);
  
  // Set up WebSocket for real-time updates
  const wss = new WebSocketServer({ 
    server: httpServer,
    path: '/ws'
  });
  const clients: WSClient[] = [];
  
  wss.on('connection', (ws) => {
    const clientId = Date.now().toString();
    clients.push({ id: clientId, ws });
    
    // Send an initial confirmation message
    try {
      ws.send(JSON.stringify({ type: 'connection', status: 'connected', id: clientId }));
    } catch (error) {
      console.error('Error sending connection confirmation:', error);
    }
    
    ws.on('message', (message) => {
      // Handle any incoming messages if needed
      console.log('Received message from client:', clientId);
    });
    
    ws.on('close', () => {
      const index = clients.findIndex(client => client.id === clientId);
      if (index !== -1) {
        clients.splice(index, 1);
      }
      console.log('Client disconnected:', clientId);
    });
    
    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
      // Remove client on error
      const index = clients.findIndex(client => client.id === clientId);
      if (index !== -1) {
        clients.splice(index, 1);
      }
    });
  });
  
  const broadcastUpdate = (type: string, data: any) => {
    const message = JSON.stringify({ type, data });
    clients.forEach(client => {
      try {
        if (client.ws.readyState === 1) { // OPEN
          client.ws.send(message);
        }
      } catch (error) {
        console.error(`Error broadcasting to client ${client.id}:`, error);
      }
    });
  };
  
  // Stats endpoint
  app.get('/api/stats', async (req: Request, res: Response) => {
    try {
      const stats = await storage.getStats();
      res.json(stats);
    } catch (error) {
      console.error('Error fetching stats:', error);
      res.status(500).json({ message: 'Failed to fetch stats' });
    }
  });
  
  // Attack distribution endpoint
  app.get('/api/attacks/distribution', async (req: Request, res: Response) => {
    try {
      const timeRange = req.query.timeRange as string || 'month';
      const validTimeRanges = ['day', 'week', 'month'];
      
      if (!validTimeRanges.includes(timeRange)) {
        return res.status(400).json({ message: 'Invalid time range. Must be one of: day, week, month' });
      }
      
      const distribution = await storage.getAttackDistribution(timeRange);
      res.json(distribution);
    } catch (error) {
      console.error('Error fetching attack distribution:', error);
      res.status(500).json({ message: 'Failed to fetch attack distribution' });
    }
  });
  
  // Recent attack types endpoint
  app.get('/api/attacks/recent', async (req: Request, res: Response) => {
    try {
      const recentAttacks = await storage.getRecentAttackTypes();
      res.json(recentAttacks);
    } catch (error) {
      console.error('Error fetching recent attack types:', error);
      res.status(500).json({ message: 'Failed to fetch recent attack types' });
    }
  });
  
  // Intrusions endpoint with pagination and filters
  app.get('/api/intrusions', async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 5;
      const attackType = req.query.attackType as string || 'all';
      const status = req.query.status as string || 'all';
      
      const intrusions = await storage.getIntrusions(page, limit, attackType, status);
      res.json(intrusions);
    } catch (error) {
      console.error('Error fetching intrusions:', error);
      res.status(500).json({ message: 'Failed to fetch intrusions' });
    }
  });
  
  // Intrusion details endpoint
  app.get('/api/intrusions/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid intrusion ID' });
      }
      
      const intrusion = await storage.getIntrusionById(id);
      if (!intrusion) {
        return res.status(404).json({ message: 'Intrusion not found' });
      }
      
      res.json(intrusion);
    } catch (error) {
      console.error('Error fetching intrusion details:', error);
      res.status(500).json({ message: 'Failed to fetch intrusion details' });
    }
  });
  
  // Update intrusion status endpoint
  app.patch('/api/intrusions/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid intrusion ID' });
      }
      
      const updateSchema = z.object({
        status: z.string()
      });
      
      const parsedBody = updateSchema.safeParse(req.body);
      if (!parsedBody.success) {
        return res.status(400).json({ message: 'Invalid request body', errors: parsedBody.error.errors });
      }
      
      const { status } = parsedBody.data;
      const updatedIntrusion = await storage.updateIntrusionStatus(id, status);
      
      if (!updatedIntrusion) {
        return res.status(404).json({ message: 'Intrusion not found' });
      }
      
      // Broadcast update to connected clients
      broadcastUpdate('intrusion_updated', { id, status });
      
      res.json(updatedIntrusion);
    } catch (error) {
      console.error('Error updating intrusion status:', error);
      res.status(500).json({ message: 'Failed to update intrusion status' });
    }
  });
  
  // Education information endpoint
  app.get('/api/education/attacks', async (req: Request, res: Response) => {
    try {
      const securityInfo = await storage.getEducationSecurityInfo();
      res.json(securityInfo);
    } catch (error) {
      console.error('Error fetching security education information:', error);
      res.status(500).json({ message: 'Failed to fetch security education information' });
    }
  });
  
  // Dataset information endpoint
  app.get('/api/dataset/info', async (req: Request, res: Response) => {
    try {
      const datasetInfo = await storage.getDatasetInfo();
      res.json(datasetInfo);
    } catch (error) {
      console.error('Error fetching dataset information:', error);
      res.status(500).json({ message: 'Failed to fetch dataset information' });
    }
  });
  
  // Chat API
  app.post('/api/chat', async (req: Request, res: Response) => {
    try {
      const sessionId = req.headers['x-session-id'] as string || Date.now().toString();
      const messageSchema = z.object({
        message: z.string()
      });
      
      const parsedBody = messageSchema.safeParse(req.body);
      if (!parsedBody.success) {
        return res.status(400).json({ message: 'Invalid request body', errors: parsedBody.error.errors });
      }
      
      const { message } = parsedBody.data;
      
      // Save user message
      await storage.createChatMessage({
        sessionId,
        role: 'user',
        content: message
      });
      
      // Generate a response based on the message content
      let response = '';
      
      if (message.toLowerCase().includes('dos') || message.toLowerCase().includes('denial of service')) {
        response = 'A Denial of Service (DoS) attack attempts to make a network resource unavailable by flooding it with traffic or requests. This overwhelms the system, preventing legitimate users from accessing services.\n\nTo protect your network:\n- Implement rate limiting to restrict the number of requests\n- Use DDoS protection services that can detect and mitigate attacks\n- Configure your network hardware to handle traffic spikes\n- Set up traffic monitoring to detect unusual patterns\n- Create a response plan to quickly address attacks when they occur';
      } 
      else if (message.toLowerCase().includes('probe') || message.toLowerCase().includes('scan')) {
        response = 'Probe or scanning attacks are reconnaissance attacks where malicious actors scan networks for vulnerabilities, open ports, and services that can be exploited later.\n\nTo protect against probing:\n- Keep systems updated with the latest security patches\n- Close unnecessary network ports\n- Use firewalls to block suspicious scanning activity\n- Implement intrusion detection systems\n- Monitor network traffic for scanning patterns';
      }
      else if (message.toLowerCase().includes('r2l') || message.toLowerCase().includes('remote')) {
        response = 'Remote to Local (R2L) attacks involve attackers gaining unauthorized access from a remote machine to a local account or service.\n\nProtection measures include:\n- Implement strong authentication methods\n- Use encryption for sensitive communications\n- Regularly monitor access logs for anomalies\n- Apply the principle of least privilege\n- Consider using multi-factor authentication for critical systems';
      }
      else if (message.toLowerCase().includes('u2r') || message.toLowerCase().includes('root')) {
        response = 'User to Root (U2R) attacks occur when attackers attempt to gain root/administrator access to systems starting with a normal user account.\n\nTo defend against U2R attacks:\n- Regularly audit user permissions and access\n- Apply security patches promptly\n- Use privilege separation techniques\n- Implement behavior-based monitoring\n- Consider application whitelisting for critical systems';
      }
      else if (message.toLowerCase().includes('protect') || message.toLowerCase().includes('secure')) {
        response = 'General network security best practices include:\n- Keep all systems and software updated with security patches\n- Use strong, unique passwords and consider a password manager\n- Implement multi-factor authentication where possible\n- Segment your network to contain potential breaches\n- Regularly back up critical data\n- Use encryption for sensitive data\n- Train users on security awareness\n- Monitor systems for unusual activity\n- Maintain and test an incident response plan';
      }
      else {
        response = 'I\'m your AI security assistant. I can help explain different types of network attacks and provide advice on protecting your systems. Feel free to ask about specific attack types like DoS, Probe, R2L, or U2R attacks, or general security best practices.';
      }
      
      // Save assistant response
      await storage.createChatMessage({
        sessionId,
        role: 'assistant',
        content: response
      });
      
      res.json({ 
        sessionId, 
        response,
      });
    } catch (error) {
      console.error('Error processing chat message:', error);
      res.status(500).json({ message: 'Failed to process chat message' });
    }
  });
  
  return httpServer;
}
