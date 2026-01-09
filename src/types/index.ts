export type IncidentStatus = 'detected' | 'assessing' | 'confirmed' | 'responding' | 'resolved';
export type ThreatLevel = 'low' | 'medium' | 'high' | 'critical';
export type DroneStatus = 'docked' | 'launching' | 'active' | 'returning' | 'offline';
export type EvidenceType = 'video' | 'photo' | 'thermal' | 'audio' | 'ai-detection';

export interface Location {
  lat: number;
  lng: number;
  name?: string;
}

export interface Drone {
  id: string;
  name: string;
  status: DroneStatus;
  battery: number;
  location: Location;
  altitude: number;
  speed: number;
  camera: {
    isRecording: boolean;
    angle: number;
  };
  assignedTask?: string;
}

export interface Intruder {
  id: string;
  lastSeen: Location;
  confidence: number;
  description: string;
  behavior: string;
  trackingActive: boolean;
}

export interface Evidence {
  id: string;
  type: EvidenceType;
  timestamp: Date;
  droneId: string;
  location: Location;
  thumbnail?: string;
  tags: string[];
  confidence: number;
  description: string;
  critical: boolean;
}

export interface TimelineEvent {
  id: string;
  timestamp: Date;
  type: 'detection' | 'drone-action' | 'ai-insight' | 'operator-action' | 'escalation';
  title: string;
  description: string;
  severity: 'info' | 'warning' | 'critical';
  metadata?: Record<string, unknown>;
}

export interface AIInsight {
  id: string;
  timestamp: Date;
  message: string;
  type: 'assessment' | 'recommendation' | 'prediction' | 'alert';
  confidence: number;
  actions?: Array<{
    label: string;
    primary?: boolean;
    onClick: () => void;
  }>;
}

export interface Incident {
  id: string;
  siteId: string;
  siteName: string;
  status: IncidentStatus;
  threatLevel: ThreatLevel;
  startTime: Date;
  location: Location;
  intruders: Intruder[];
  drones: Drone[];
  evidence: Evidence[];
  timeline: TimelineEvent[];
  aiInsights: AIInsight[];
  aiSummary: string;
}
