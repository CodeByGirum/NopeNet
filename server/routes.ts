import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertChatMessageSchema } from "@shared/schema";
import { WebSocketServer } from "ws";
import OpenAI from "openai";
import { exec } from "child_process";
import { promisify } from "util";

// Convert exec to Promise-based
const execAsync = promisify(exec);

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Network scan results type
interface ScanResult {
  id: string;
  timestamp: string;
  findings: {
    deviceIP: string;
    deviceType: string;
    openPorts: { port: number; service: string; status: string }[];
    vulnerabilities: { severity: string; description: string; affectedService: string }[];
    recommendations: string[];
  }[];
  summary: {
    devicesScanned: number;
    vulnerabilitiesFound: number;
    criticalIssues: number;
    scanDuration: string;
  };
}

// Map to store scan results
const scanResults: Map<string, ScanResult> = new Map();

// Helper functions for network scanning
async function scanNetwork(): Promise<ScanResult> {
  const scanId = Date.now().toString();
  const timestamp = new Date().toISOString();
  
  try {
    // This would normally involve actual network scanning tools
    // For demo purposes, we'll simulate a scan with realistic data
    
    // Simulate scan duration
    const scanDuration = Math.floor(Math.random() * 15) + 5; // 5-20 seconds
    
    // Create findings for 5-10 devices
    const deviceCount = Math.floor(Math.random() * 6) + 5;
    const findings = [];
    let criticalCount = 0;
    let vulnCount = 0;
    
    // Network device types
    const deviceTypes = [
      'Router', 'Switch', 'Desktop', 'Laptop', 'Mobile Device', 
      'Server', 'IoT Device', 'Network Printer', 'Security Camera'
    ];
    
    // Generate random IP in private ranges
    const generateIP = () => {
      const ranges = ['192.168.1', '192.168.0', '10.0.0', '10.0.1', '172.16.0'];
      const range = ranges[Math.floor(Math.random() * ranges.length)];
      const host = Math.floor(Math.random() * 254) + 1;
      return `${range}.${host}`;
    };
    
    for (let i = 0; i < deviceCount; i++) {
      const deviceIP = generateIP();
      const deviceType = deviceTypes[Math.floor(Math.random() * deviceTypes.length)];
      
      // Generate 1-5 open ports
      const portCount = Math.floor(Math.random() * 5) + 1;
      const openPorts = [];
      const commonPorts = [
        { port: 22, service: 'SSH' },
        { port: 80, service: 'HTTP' },
        { port: 443, service: 'HTTPS' },
        { port: 21, service: 'FTP' },
        { port: 25, service: 'SMTP' },
        { port: 53, service: 'DNS' },
        { port: 3389, service: 'RDP' },
        { port: 445, service: 'SMB' },
        { port: 137, service: 'NetBIOS' },
        { port: 8080, service: 'HTTP Alternate' }
      ];
      
      // Select random ports from common ports
      const selectedPorts = [];
      while (selectedPorts.length < portCount) {
        const randomIndex = Math.floor(Math.random() * commonPorts.length);
        const portInfo = commonPorts[randomIndex];
        if (!selectedPorts.includes(portInfo.port)) {
          selectedPorts.push(portInfo.port);
          openPorts.push({
            port: portInfo.port,
            service: portInfo.service,
            status: Math.random() < 0.8 ? 'filtered' : 'open'
          });
        }
      }
      
      // Generate 0-3 vulnerabilities per device
      const vulnPerDevice = Math.floor(Math.random() * 4);
      const vulnerabilities = [];
      const vulnDescriptions = [
        { severity: 'critical', description: 'Outdated firmware with known exploits', affectedService: 'System' },
        { severity: 'high', description: 'Weak password policy detected', affectedService: 'Authentication' },
        { severity: 'medium', description: 'TLS 1.0/1.1 supported', affectedService: 'HTTPS' },
        { severity: 'high', description: 'SMB signing not required', affectedService: 'SMB' },
        { severity: 'critical', description: 'Remote code execution vulnerability', affectedService: 'RDP' },
        { severity: 'medium', description: 'Anonymous FTP access enabled', affectedService: 'FTP' },
        { severity: 'low', description: 'HTTP server information disclosure', affectedService: 'HTTP' },
        { severity: 'high', description: 'Default credentials in use', affectedService: 'Authentication' }
      ];
      
      // Select random vulnerabilities
      for (let j = 0; j < vulnPerDevice; j++) {
        const randomVuln = vulnDescriptions[Math.floor(Math.random() * vulnDescriptions.length)];
        vulnerabilities.push(randomVuln);
        vulnCount++;
        if (randomVuln.severity === 'critical') {
          criticalCount++;
        }
      }
      
      // Generate recommendations
      const recommendations = [];
      if (vulnerabilities.find(v => v.severity === 'critical' || v.severity === 'high')) {
        recommendations.push('Update firmware to latest version');
        recommendations.push('Implement strong password policy');
      }
      if (openPorts.find(p => p.status === 'open')) {
        recommendations.push('Filter unnecessary open ports');
      }
      if (vulnerabilities.find(v => v.affectedService === 'Authentication')) {
        recommendations.push('Enable multi-factor authentication');
      }
      
      findings.push({
        deviceIP,
        deviceType,
        openPorts,
        vulnerabilities,
        recommendations
      });
    }
    
    // Create scan result
    const result: ScanResult = {
      id: scanId,
      timestamp,
      findings,
      summary: {
        devicesScanned: deviceCount,
        vulnerabilitiesFound: vulnCount,
        criticalIssues: criticalCount,
        scanDuration: `${scanDuration}s`
      }
    };
    
    // Store the scan result
    scanResults.set(scanId, result);
    
    // Create an intrusion record for each critical vulnerability
    if (criticalCount > 0) {
      findings.forEach(device => {
        const criticalVulns = device.vulnerabilities.filter(v => v.severity === 'critical');
        criticalVulns.forEach(async (vuln) => {
          await storage.createIntrusion({
            sourceIp: device.deviceIP,
            attackTypeId: Math.floor(Math.random() * 5) + 1, // Random attack type ID
            confidence: Math.random() * 40 + 60, // 60-100% confidence
            status: 'detected',
            details: `Critical vulnerability: ${vuln.description} on ${device.deviceType} (${vuln.affectedService})`
          });
        });
      });
    }
    
    return result;
  } catch (error) {
    console.error('Error during network scan:', error);
    return {
      id: scanId,
      timestamp,
      findings: [],
      summary: {
        devicesScanned: 0,
        vulnerabilitiesFound: 0,
        criticalIssues: 0,
        scanDuration: '0s'
      }
    };
  }
}

// Format OpenAI messages based on chat history
function formatOpenAIMessages(messages: any[], systemPrompt: string, additionalContext?: string) {
  const formattedMessages = [
    { 
      role: "system", 
      content: systemPrompt + (additionalContext ? `\n\n${additionalContext}` : '')
    }
  ];
  
  // Add conversation history
  for (const msg of messages) {
    formattedMessages.push({
      role: msg.role,
      content: msg.content
    });
  }
  
  return formattedMessages;
}

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
  
  // Network scan endpoint
  app.post('/api/scan/network', async (req: Request, res: Response) => {
    try {
      // Start network scan
      const scanResult = await scanNetwork();
      
      // Broadcast the scan results to all connected clients
      broadcastUpdate('scan_complete', scanResult);
      
      res.json(scanResult);
    } catch (error) {
      console.error('Error during network scan:', error);
      res.status(500).json({ message: 'Failed to complete network scan' });
    }
  });

  // Get latest scan result
  app.get('/api/scan/latest', (req: Request, res: Response) => {
    try {
      // Get the latest scan result
      if (scanResults.size === 0) {
        return res.status(404).json({ message: 'No scan results available' });
      }
      
      // Sort by timestamp and return latest
      const sortedResults = Array.from(scanResults.values())
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      
      res.json(sortedResults[0]);
    } catch (error) {
      console.error('Error fetching latest scan result:', error);
      res.status(500).json({ message: 'Failed to fetch scan result' });
    }
  });

  // Enhanced chat endpoint with OpenAI
  app.post('/api/chat', async (req: Request, res: Response) => {
    try {
      const sessionId = req.headers['x-session-id'] as string || Date.now().toString();
      const messageSchema = z.object({
        message: z.string(),
        context: z.any().optional()
      });
      
      const parsedBody = messageSchema.safeParse(req.body);
      if (!parsedBody.success) {
        return res.status(400).json({ message: 'Invalid request body', errors: parsedBody.error.errors });
      }
      
      const { message, context } = parsedBody.data;
      
      // Save user message
      await storage.createChatMessage({
        sessionId,
        role: 'user',
        content: message
      });
      
      // Get chat history
      const chatHistory = await storage.getChatMessagesBySession(sessionId);
      
      // Check if OpenAI API key is available
      if (!process.env.OPENAI_API_KEY) {
        // Fall back to rule-based responses if no API key
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
        
        return res.json({ 
          sessionId, 
          response,
        });
      }

      // Custom system prompt for security assistant
      const systemPrompt = `You are an AI security assistant for a cybersecurity dashboard application. Your role is to:
1. Analyze security threats and explain them in simple language
2. Provide actionable recommendations to improve security posture
3. Help users understand technical security concepts
4. Interpret data from the dashboard when referenced
5. Provide clear, precise explanations about intrusion detection
6. Format your responses using markdown for readability

When asked about security concepts or threats, provide educational responses.
When asked to analyze data on the dashboard, provide insights and explanations.
When asked for recommendations, provide specific actionable steps.`;
      
      // Add contextual information if provided
      let additionalContext = '';
      if (context) {
        additionalContext = `Current dashboard context: ${JSON.stringify(context)}`;
      }
      
      // Format messages for OpenAI
      const formattedMessages = formatOpenAIMessages(
        chatHistory.slice(-10), // Last 10 messages for context
        systemPrompt,
        additionalContext
      );
      
      try {
        // Call OpenAI API
        const completion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: formattedMessages,
          max_tokens: 1000,
          temperature: 0.7,
        });
        
        // Get AI response
        const response = completion.choices[0].message.content || "I'm sorry, I couldn't generate a response.";
        
        // Save assistant response
        await storage.createChatMessage({
          sessionId,
          role: 'assistant',
          content: response
        });
        
        return res.json({ 
          sessionId, 
          response 
        });
      } catch (openaiError) {
        console.error('Error calling OpenAI:', openaiError);
        
        // Fallback response if OpenAI API fails
        const fallbackResponse = "I'm sorry, I encountered an error processing your request. Please try again later.";
        
        await storage.createChatMessage({
          sessionId,
          role: 'assistant',
          content: fallbackResponse
        });
        
        return res.json({ 
          sessionId, 
          response: fallbackResponse 
        });
      }
    } catch (error) {
      console.error('Error processing chat message:', error);
      res.status(500).json({ message: 'Failed to process chat message' });
    }
  });
  
  return httpServer;
}
