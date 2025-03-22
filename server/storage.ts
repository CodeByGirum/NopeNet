import { 
  users, type User, type InsertUser,
  attackTypes, type AttackType, type InsertAttackType,
  intrusions, type Intrusion, type InsertIntrusion,
  securityTips, type SecurityTip, type InsertSecurityTip,
  chatMessages, type ChatMessage, type InsertChatMessage,
  stats, type Stats, type InsertStats,
  datasetInfo, type DatasetInfo,
  modelPerformance, type ModelPerformance
} from "@shared/schema";

// Interface for all storage operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Attack Types operations
  getAttackTypes(): Promise<AttackType[]>;
  getAttackType(id: number): Promise<AttackType | undefined>;
  createAttackType(attackType: InsertAttackType): Promise<AttackType>;
  
  // Intrusions operations
  getIntrusions(page: number, limit: number, attackType?: string, status?: string): Promise<{ intrusions: IntrusionWithType[], total: number, page: number, pages: number }>;
  getIntrusionById(id: number): Promise<IntrusionWithType | undefined>;
  createIntrusion(intrusion: InsertIntrusion): Promise<Intrusion>;
  updateIntrusionStatus(id: number, status: string): Promise<Intrusion | undefined>;
  
  // Security Tips operations
  getSecurityTips(): Promise<SecurityTip[]>;
  getSecurityTipsByAttackType(attackTypeId: number): Promise<SecurityTip[]>;
  createSecurityTip(securityTip: InsertSecurityTip): Promise<SecurityTip>;
  
  // Chat operations
  getChatMessagesBySession(sessionId: string): Promise<ChatMessage[]>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  
  // Stats operations
  getStats(): Promise<Stats | undefined>;
  updateStats(stats: InsertStats): Promise<Stats>;
  
  // Dataset operations
  getDatasetInfo(): Promise<{ datasetInfo: DatasetInfo, models: ModelPerformance[] }>;
  
  // Dashboard data operations
  getAttackDistribution(timeRange: string): Promise<{ timeRange: string, distribution: AttackDistributionItem[] }>;
  getRecentAttackTypes(): Promise<RecentAttackTypeItem[]>;
}

// Extended interface types
export interface IntrusionWithType extends Omit<Intrusion, 'attackTypeId'> {
  attackType: string;
  attackTypeClass: string;
  statusClass: string;
}

export interface AttackDistributionItem {
  name: string;
  count: number;
  color: string;
}

export interface RecentAttackTypeItem {
  id: string;
  name: string;
  count: number;
  change: number;
  icon: string;
  color: string;
  borderColor: string;
}

export interface SecurityInfoItem {
  id: string;
  name: string;
  description: string;
  tips: { id: string; tip: string; }[];
  color: string;
  gradient: string;
  icon: string;
  iconClass: string;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private attackTypesData: Map<number, AttackType>;
  private intrusionsData: Map<number, Intrusion>;
  private securityTipsData: Map<number, SecurityTip>;
  private chatMessagesData: Map<string, ChatMessage[]>;
  private statsData: Stats;
  private datasetInfoData: DatasetInfo;
  private modelPerformanceData: ModelPerformance[];
  
  private currentUserId: number = 1;
  private currentAttackTypeId: number = 1;
  private currentIntrusionId: number = 1;
  private currentSecurityTipId: number = 1;
  private currentChatMessageId: number = 1;
  private currentStatsId: number = 1;
  
  constructor() {
    this.users = new Map();
    this.attackTypesData = new Map();
    this.intrusionsData = new Map();
    this.securityTipsData = new Map();
    this.chatMessagesData = new Map();
    
    // Initialize stats with default values
    this.statsData = {
      id: this.currentStatsId++,
      totalRequests: 1500,
      attacksDetected: 250,
      modelAccuracy: 85,
      requestIncrease: 12,
      attackIncrease: 8,
      accuracyImprovement: 3,
      updatedAt: new Date()
    };
    
    // Initialize dataset info
    this.datasetInfoData = {
      id: 1,
      name: "KDD Cup 1999",
      totalRecords: 4898431,
      attackClasses: 5,
      features: 41
    };
    
    // Initialize model performance data
    this.modelPerformanceData = [
      { id: 1, name: "SVM with SMOTE", accuracy: 85, precision: 87, recall: 83, f1Score: 85 },
      { id: 2, name: "Random Forest", accuracy: 82, precision: 80, recall: 81, f1Score: 80 },
      { id: 3, name: "Deep Neural Network", accuracy: 88, precision: 86, recall: 89, f1Score: 87 },
      { id: 4, name: "Bayesian Network", accuracy: 79, precision: 75, recall: 80, f1Score: 77 }
    ];
    
    // Initialize attack types
    this.initializeAttackTypes();
    
    // Initialize security tips
    this.initializeSecurityTips();
    
    // Initialize intrusions (async)
    this.initializeData();
  }
  
  private async initializeData(): Promise<void> {
    try {
      await this.initializeIntrusions();
    } catch (error) {
      console.error("Error initializing intrusions:", error);
    }
  }
  
  private initializeAttackTypes(): void {
    const attackTypeData: InsertAttackType[] = [
      {
        name: "DoS Attack",
        description: "Denial of Service attacks overwhelm systems with traffic or requests, making services unavailable to legitimate users.",
        color: "red",
        className: "bg-red-500/20 text-red-400",
        icon: "fas fa-skull-crossbones"
      },
      {
        name: "Probe Attack",
        description: "Reconnaissance attacks that scan networks for vulnerabilities, open ports, and services that can be exploited later.",
        color: "amber",
        className: "bg-amber-500/20 text-amber-400",
        icon: "fas fa-user-secret"
      },
      {
        name: "R2L Attack",
        description: "Remote to Local attacks where attackers gain unauthorized access from a remote machine to a local account or service.",
        color: "green",
        className: "bg-green-500/20 text-green-400",
        icon: "fas fa-laptop-code"
      },
      {
        name: "U2R Attack",
        description: "User to Root attacks where attackers attempt to gain root/administrator access to systems starting with a normal user account.",
        color: "blue",
        className: "bg-blue-500/20 text-blue-400",
        icon: "fas fa-user-lock"
      },
      {
        name: "Unknown",
        description: "Unidentified or novel attack patterns that don't match known signatures but exhibit suspicious behavior.",
        color: "purple",
        className: "bg-purple-500/20 text-purple-400",
        icon: "fas fa-question-circle"
      }
    ];
    
    attackTypeData.forEach(attackType => {
      this.createAttackType(attackType);
    });
  }
  
  private initializeSecurityTips(): void {
    const securityTipData: { attackTypeId: number; tips: string[] }[] = [
      {
        attackTypeId: 1,
        tips: [
          "Implement rate limiting on your services",
          "Use DDoS protection services",
          "Configure network to handle traffic spikes",
          "Set up traffic monitoring to detect unusual patterns",
          "Have a response plan ready for mitigation"
        ]
      },
      {
        attackTypeId: 2,
        tips: [
          "Keep systems updated with security patches",
          "Close unnecessary network ports",
          "Use firewalls to block suspicious scanning",
          "Implement intrusion detection systems",
          "Monitor network traffic for scanning patterns"
        ]
      },
      {
        attackTypeId: 3,
        tips: [
          "Implement strong authentication methods",
          "Use encryption for sensitive communications",
          "Regularly monitor access logs for anomalies",
          "Apply the principle of least privilege",
          "Implement multi-factor authentication"
        ]
      },
      {
        attackTypeId: 4,
        tips: [
          "Regularly audit user permissions and access",
          "Apply security patches promptly",
          "Use privilege separation techniques",
          "Implement behavior-based monitoring",
          "Use application whitelisting"
        ]
      },
      {
        attackTypeId: 5,
        tips: [
          "Employ behavior-based intrusion detection",
          "Maintain up-to-date threat intelligence",
          "Implement honeypots to detect novel attacks",
          "Use AI-based security monitoring",
          "Regularly update security rules"
        ]
      }
    ];
    
    securityTipData.forEach(data => {
      data.tips.forEach(tip => {
        this.createSecurityTip({
          attackTypeId: data.attackTypeId,
          tip
        });
      });
    });
  }
  
  private async initializeIntrusions(): Promise<void> {
    const statusTypes = ["Blocked", "Monitoring", "Resolved", "Investigating"];
    const ipRanges = ["192.168.1.", "10.0.0.", "172.16.0.", "169.254.0."];
    const confidenceRanges = [
      { min: 90, max: 99 },
      { min: 75, max: 89 },
      { min: 60, max: 74 },
      { min: 45, max: 59 },
      { min: 30, max: 44 }
    ];
    
    const getRandomStatusClass = (status: string): string => {
      switch (status.toLowerCase()) {
        case "blocked": return "bg-red-500/20 text-red-400";
        case "monitoring": return "bg-amber-500/20 text-amber-400";
        case "resolved": return "bg-green-500/20 text-green-400";
        case "investigating": return "bg-amber-500/20 text-amber-400";
        default: return "bg-purple-500/20 text-purple-400";
      }
    };
    
    const getRandomDetail = (attackTypeId: number, confidence: number): string => {
      const details = [
        `Detected ${confidence}% confidence match with signature database. Multiple packets with malformed headers received from this IP.`,
        `This IP has been observed scanning multiple ports (21, 22, 80, 443) in quick succession.`,
        `Unusual authentication patterns detected. Multiple failed login attempts followed by successful login.`,
        `Privilege escalation attempt detected. User attempted to execute commands requiring root access.`,
        `Unusual network traffic patterns detected from this IP. Traffic doesn't match known attack signatures but exhibits anomalous behavior.`
      ];
      
      return details[attackTypeId - 1];
    };
    
    // Generate 50 sample intrusions
    for (let i = 0; i < 50; i++) {
      const attackTypeId = Math.floor(Math.random() * 5) + 1;
      const confidenceRange = confidenceRanges[attackTypeId - 1];
      const confidence = Math.floor(Math.random() * (confidenceRange.max - confidenceRange.min + 1)) + confidenceRange.min;
      const status = statusTypes[Math.floor(Math.random() * statusTypes.length)];
      const ipBase = ipRanges[Math.floor(Math.random() * ipRanges.length)];
      const ipSuffix = Math.floor(Math.random() * 255);
      const sourceIp = `${ipBase}${ipSuffix}`;
      
      // Create a timestamp for some time in the past (up to 7 days ago)
      const currentTime = new Date();
      const daysAgo = Math.floor(Math.random() * 7);
      const hoursAgo = Math.floor(Math.random() * 24);
      const minutesAgo = Math.floor(Math.random() * 60);
      
      // Create the details with the confidence level
      const details = getRandomDetail(attackTypeId, confidence);
      
      // Create the intrusion object directly with the proper type structure
      const id = this.currentIntrusionId++;
      const timestamp = new Date(currentTime);
      timestamp.setDate(timestamp.getDate() - daysAgo);
      timestamp.setHours(timestamp.getHours() - hoursAgo);
      timestamp.setMinutes(timestamp.getMinutes() - minutesAgo);
      
      const newIntrusion: Intrusion = {
        id,
        timestamp,
        sourceIp,
        attackTypeId,
        confidence,
        status,
        details: details || null
      };
      
      this.intrusionsData.set(id, newIntrusion);
      this.currentIntrusionId++;
    }
  }
  
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }
  
  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }
  
  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Attack Types methods
  async getAttackTypes(): Promise<AttackType[]> {
    return Array.from(this.attackTypesData.values());
  }
  
  async getAttackType(id: number): Promise<AttackType | undefined> {
    return this.attackTypesData.get(id);
  }
  
  async createAttackType(attackType: InsertAttackType): Promise<AttackType> {
    const id = this.currentAttackTypeId++;
    const newAttackType: AttackType = { ...attackType, id };
    this.attackTypesData.set(id, newAttackType);
    return newAttackType;
  }
  
  // Intrusions methods
  async getIntrusions(
    page: number = 1,
    limit: number = 10,
    attackType?: string,
    status?: string
  ): Promise<{ intrusions: IntrusionWithType[], total: number, page: number, pages: number }> {
    let intrusions = Array.from(this.intrusionsData.values())
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    
    // Apply filters
    if (attackType && attackType !== 'all') {
      const attackTypes = await this.getAttackTypes();
      const attackTypeObj = attackTypes.find(at => at.name.toLowerCase().includes(attackType.toLowerCase()));
      if (attackTypeObj) {
        intrusions = intrusions.filter(i => i.attackTypeId === attackTypeObj.id);
      }
    }
    
    if (status && status !== 'all') {
      intrusions = intrusions.filter(i => i.status.toLowerCase() === status.toLowerCase());
    }
    
    const total = intrusions.length;
    const pages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const paginatedIntrusions = intrusions.slice(startIndex, startIndex + limit);
    
    // Map intrusions to include attack type details
    const intrusionsWithType: IntrusionWithType[] = await Promise.all(
      paginatedIntrusions.map(async intrusion => {
        const attackType = await this.getAttackType(intrusion.attackTypeId);
        return {
          ...intrusion,
          attackType: attackType ? attackType.name : 'Unknown',
          attackTypeClass: attackType ? attackType.className : 'bg-purple-500/20 text-purple-400',
          statusClass: this.getStatusClass(intrusion.status)
        };
      })
    );
    
    return {
      intrusions: intrusionsWithType,
      total,
      page,
      pages
    };
  }
  
  async getIntrusionById(id: number): Promise<IntrusionWithType | undefined> {
    const intrusion = this.intrusionsData.get(id);
    if (!intrusion) return undefined;
    
    const attackType = await this.getAttackType(intrusion.attackTypeId);
    return {
      ...intrusion,
      attackType: attackType ? attackType.name : 'Unknown',
      attackTypeClass: attackType ? attackType.className : 'bg-purple-500/20 text-purple-400',
      statusClass: this.getStatusClass(intrusion.status)
    };
  }
  
  private getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'blocked': return 'bg-red-500/20 text-red-400';
      case 'monitoring': return 'bg-amber-500/20 text-amber-400';
      case 'resolved': return 'bg-green-500/20 text-green-400';
      case 'investigating': return 'bg-amber-500/20 text-amber-400';
      default: return 'bg-purple-500/20 text-purple-400';
    }
  }
  
  async createIntrusion(intrusion: InsertIntrusion): Promise<Intrusion> {
    const id = this.currentIntrusionId++;
    const timestamp = new Date();
    const newIntrusion: Intrusion = { 
      ...intrusion, 
      id, 
      timestamp,
      details: intrusion.details || null 
    };
    this.intrusionsData.set(id, newIntrusion);
    return newIntrusion;
  }
  
  async updateIntrusionStatus(id: number, status: string): Promise<Intrusion | undefined> {
    const intrusion = this.intrusionsData.get(id);
    if (!intrusion) return undefined;
    
    const updatedIntrusion: Intrusion = { ...intrusion, status };
    this.intrusionsData.set(id, updatedIntrusion);
    return updatedIntrusion;
  }
  
  // Security Tips methods
  async getSecurityTips(): Promise<SecurityTip[]> {
    return Array.from(this.securityTipsData.values());
  }
  
  async getSecurityTipsByAttackType(attackTypeId: number): Promise<SecurityTip[]> {
    return Array.from(this.securityTipsData.values())
      .filter(tip => tip.attackTypeId === attackTypeId);
  }
  
  async createSecurityTip(securityTip: InsertSecurityTip): Promise<SecurityTip> {
    const id = this.currentSecurityTipId++;
    const newSecurityTip: SecurityTip = { ...securityTip, id };
    this.securityTipsData.set(id, newSecurityTip);
    return newSecurityTip;
  }
  
  // Chat methods
  async getChatMessagesBySession(sessionId: string): Promise<ChatMessage[]> {
    return this.chatMessagesData.get(sessionId) || [];
  }
  
  async createChatMessage(message: InsertChatMessage): Promise<ChatMessage> {
    const id = this.currentChatMessageId++;
    const timestamp = new Date();
    const newMessage: ChatMessage = { ...message, id, timestamp };
    
    const sessionMessages = this.chatMessagesData.get(message.sessionId) || [];
    sessionMessages.push(newMessage);
    this.chatMessagesData.set(message.sessionId, sessionMessages);
    
    return newMessage;
  }
  
  // Stats methods
  async getStats(): Promise<Stats | undefined> {
    return this.statsData;
  }
  
  async updateStats(newStats: InsertStats): Promise<Stats> {
    const updatedStats: Stats = {
      ...this.statsData,
      ...newStats,
      updatedAt: new Date()
    };
    
    this.statsData = updatedStats;
    return updatedStats;
  }
  
  // Dataset methods
  async getDatasetInfo(): Promise<{ datasetInfo: DatasetInfo, models: ModelPerformance[] }> {
    return {
      datasetInfo: this.datasetInfoData,
      models: this.modelPerformanceData
    };
  }
  
  // Dashboard data methods
  async getAttackDistribution(timeRange: string): Promise<{ timeRange: string, distribution: AttackDistributionItem[] }> {
    // Get all attack types
    const attackTypes = await this.getAttackTypes();
    
    // Prepare result structure
    const distribution: AttackDistributionItem[] = [];
    
    // Get timeframe start based on the requested range
    const startDate = new Date();
    switch (timeRange) {
      case 'day':
        startDate.setDate(startDate.getDate() - 1);
        break;
      case 'week':
        startDate.setDate(startDate.getDate() - 7);
        break;
      case 'month':
      default:
        startDate.setMonth(startDate.getMonth() - 1);
        break;
    }
    
    // Get all intrusions within the timeframe
    const intrusions = Array.from(this.intrusionsData.values())
      .filter(intrusion => new Date(intrusion.timestamp) >= startDate);
    
    // Count intrusions by attack type
    attackTypes.forEach(attackType => {
      const count = intrusions.filter(intrusion => intrusion.attackTypeId === attackType.id).length;
      const colorMap: Record<string, string> = {
        'red': '#FF5555',
        'amber': '#FFDF00',
        'green': '#39FF14',
        'blue': '#3B82F6',
        'purple': '#A855F7'
      };
      
      distribution.push({
        name: attackType.name,
        count,
        color: colorMap[attackType.color] || '#39FF14'
      });
    });
    
    return {
      timeRange,
      distribution
    };
  }
  
  async getRecentAttackTypes(): Promise<RecentAttackTypeItem[]> {
    // Get all attack types
    const attackTypes = await this.getAttackTypes();
    
    // Get counts for each attack type
    const results: RecentAttackTypeItem[] = [];
    
    for (const attackType of attackTypes) {
      // Count intrusions of this type
      const count = Array.from(this.intrusionsData.values())
        .filter(intrusion => intrusion.attackTypeId === attackType.id)
        .length;
      
      // Calculate a random change percentage (in a real app this would be based on historical data)
      const change = Math.floor(Math.random() * 20) + 1;
      
      // Map colors based on the attack type color
      const borderColor = `border-${attackType.color}-500`;
      
      results.push({
        id: attackType.id.toString(),
        name: attackType.name,
        count,
        change,
        icon: attackType.icon,
        color: `bg-${attackType.color}-500/20`,
        borderColor
      });
    }
    
    // Sort by count (most frequent first)
    return results.sort((a, b) => b.count - a.count);
  }
  
  async getEducationSecurityInfo(): Promise<SecurityInfoItem[]> {
    const attackTypes = await this.getAttackTypes();
    const result: SecurityInfoItem[] = [];
    
    for (const attackType of attackTypes) {
      const tips = await this.getSecurityTipsByAttackType(attackType.id);
      
      result.push({
        id: attackType.id.toString(),
        name: attackType.name,
        description: attackType.description,
        tips: tips.map(tip => ({ id: tip.id.toString(), tip: tip.tip })),
        color: attackType.color,
        gradient: `bg-gradient-to-r from-${attackType.color}-500 to-${attackType.color}-700`,
        icon: attackType.icon,
        iconClass: `bg-${attackType.color}-500/20 rounded-full flex items-center justify-center text-${attackType.color}-500`
      });
    }
    
    return result;
  }
}

export const storage = new MemStorage();
