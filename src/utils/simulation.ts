import type { Incident, Drone, Intruder, Evidence, TimelineEvent, AIInsight, IncidentStatus } from '../types';

const DEALERSHIP_LOCATION = { lat: 37.7749, lng: -122.4194, name: 'Elite Motors Dealership' };

export function createInitialIncident(): Incident {
  return {
    id: 'INC-20260109-0234',
    siteId: 'SITE-001',
    siteName: 'Elite Motors - Luxury Dealership',
    status: 'detected',
    threatLevel: 'high',
    startTime: new Date(),
    location: DEALERSHIP_LOCATION,
    intruders: [],
    drones: [
      {
        id: 'DRONE-01',
        name: 'Sentinel Alpha',
        status: 'launching',
        battery: 95,
        location: { ...DEALERSHIP_LOCATION, lat: DEALERSHIP_LOCATION.lat + 0.0001 },
        altitude: 0,
        speed: 0,
        camera: { isRecording: false, angle: 0 },
        assignedTask: 'Primary surveillance'
      }
    ],
    evidence: [],
    timeline: [
      {
        id: 'evt-1',
        timestamp: new Date(Date.now() - 8000),
        type: 'detection',
        title: 'Motion Detected',
        description: 'Perimeter sensors triggered in Zone C',
        severity: 'warning'
      },
      {
        id: 'evt-2',
        timestamp: new Date(Date.now() - 5000),
        type: 'ai-insight',
        title: 'AI Validation',
        description: 'CCTV analysis confirms 2 unauthorized individuals',
        severity: 'critical'
      },
      {
        id: 'evt-3',
        timestamp: new Date(Date.now() - 2000),
        type: 'drone-action',
        title: 'Autonomous Launch Initiated',
        description: 'Drone Sentinel Alpha auto-deploying from Dock A',
        severity: 'info'
      }
    ],
    aiInsights: [],
    aiSummary: 'Motion detected at high-value section. CCTV analysis shows 2 individuals with no matching employee profiles. Autonomous response initiated.'
  };
}

export class IncidentSimulation {
  private incident: Incident;
  private listeners: Array<(incident: Incident) => void> = [];
  private timeOffset = 0;
  private intervalId: NodeJS.Timeout | null = null;

  constructor(incident: Incident) {
    this.incident = { ...incident };
  }

  subscribe(listener: (incident: Incident) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach(listener => listener({ ...this.incident }));
  }

  private addTimelineEvent(event: Omit<TimelineEvent, 'id' | 'timestamp'>) {
    const newEvent: TimelineEvent = {
      ...event,
      id: `evt-${Date.now()}-${Math.random()}`,
      timestamp: new Date()
    };
    this.incident.timeline.unshift(newEvent);
    this.notify();
  }

  private addAIInsight(insight: Omit<AIInsight, 'id' | 'timestamp'>) {
    const newInsight: AIInsight = {
      ...insight,
      id: `ai-${Date.now()}-${Math.random()}`,
      timestamp: new Date()
    };
    this.incident.aiInsights.unshift(newInsight);
    this.notify();
  }

  private addEvidence(evidence: Omit<Evidence, 'id' | 'timestamp'>) {
    const newEvidence: Evidence = {
      ...evidence,
      id: `ev-${Date.now()}-${Math.random()}`,
      timestamp: new Date()
    };
    this.incident.evidence.unshift(newEvidence);
    this.notify();
  }

  private updateDrone(droneId: string, updates: Partial<Drone>) {
    const drone = this.incident.drones.find(d => d.id === droneId);
    if (drone) {
      Object.assign(drone, updates);
      this.notify();
    }
  }

  start() {
    this.intervalId = setInterval(() => {
      this.timeOffset += 1;
      this.simulateEvents();
    }, 1000);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private simulateEvents() {
    const t = this.timeOffset;

    if (t === 3) {
      this.addAIInsight({
        message: 'Live feed analysis: 2 individuals moving toward high-value inventory section. No match with authorized personnel database.',
        type: 'assessment',
        confidence: 0.94
      });
    }

    if (t === 5) {
      this.updateDrone('DRONE-01', {
        status: 'active',
        altitude: 15,
        speed: 8,
        camera: { isRecording: true, angle: 45 }
      });
      this.addTimelineEvent({
        type: 'drone-action',
        title: 'Drone Airborne',
        description: 'Sentinel Alpha reached operational altitude',
        severity: 'info'
      });
    }

    if (t === 8) {
      this.incident.intruders.push({
        id: 'INT-01',
        lastSeen: { lat: DEALERSHIP_LOCATION.lat, lng: DEALERSHIP_LOCATION.lng + 0.0002 },
        confidence: 0.91,
        description: 'Individual 1: Male, dark clothing, carrying large bag',
        behavior: 'Moving toward display area',
        trackingActive: true
      });
      this.incident.intruders.push({
        id: 'INT-02',
        lastSeen: { lat: DEALERSHIP_LOCATION.lat, lng: DEALERSHIP_LOCATION.lng + 0.00018 },
        confidence: 0.88,
        description: 'Individual 2: Wearing hood, acting as lookout',
        behavior: 'Scanning perimeter',
        trackingActive: true
      });
      this.addEvidence({
        type: 'video',
        droneId: 'DRONE-01',
        location: DEALERSHIP_LOCATION,
        tags: ['intruder-detection', 'high-value-zone'],
        confidence: 0.91,
        description: 'Visual confirmation of 2 intruders near luxury vehicle section',
        critical: true
      });
      this.notify();
    }

    if (t === 12) {
      this.incident.status = 'confirmed';
      this.addAIInsight({
        message: 'Threat confirmed. Intruders are actively attempting vehicle access. Recommend immediate escalation and additional surveillance.',
        type: 'alert',
        confidence: 0.96
      });
      this.addTimelineEvent({
        type: 'ai-insight',
        title: 'Threat Confirmed',
        description: 'AI assessment: Active intrusion attempt detected',
        severity: 'critical'
      });
    }

    if (t === 15) {
      this.addAIInsight({
        message: 'Recommend deploying perimeter drone for exits monitoring and thermal imaging drone for complete coverage.',
        type: 'recommendation',
        confidence: 0.89
      });
    }

    if (t === 18) {
      this.addEvidence({
        type: 'thermal',
        droneId: 'DRONE-01',
        location: DEALERSHIP_LOCATION,
        tags: ['thermal-signature', 'intruder-tracking'],
        confidence: 0.95,
        description: 'Thermal imaging: 2 heat signatures, body temperature patterns consistent with human subjects',
        critical: false
      });
    }

    if (t === 22) {
      this.addEvidence({
        type: 'photo',
        droneId: 'DRONE-01',
        location: DEALERSHIP_LOCATION,
        tags: ['facial-capture', 'evidence-quality'],
        confidence: 0.87,
        description: 'High-resolution capture of Individual 1 face, suitable for identification',
        critical: true
      });
    }

    if (t === 25) {
      this.updateDrone('DRONE-01', { battery: 92 });
    }

    if (t === 30) {
      this.addTimelineEvent({
        type: 'ai-insight',
        title: 'Behavior Pattern Detected',
        description: 'AI analysis: Intruders testing vehicle doors systematically',
        severity: 'critical'
      });
    }
  }

  getIncident() {
    return { ...this.incident };
  }

  confirmThreat() {
    this.incident.status = 'responding';
    this.incident.threatLevel = 'critical';
    this.addTimelineEvent({
      type: 'operator-action',
      title: 'Operator Confirmed Threat',
      description: 'Incident escalated to active response mode',
      severity: 'critical'
    });
  }

  deployDrone(task: string) {
    const droneNames = ['Sentinel Beta', 'Sentinel Gamma', 'Sentinel Delta'];
    const tasks = ['Perimeter surveillance', 'Thermal imaging', 'Evidence capture'];
    const newDrone: Drone = {
      id: `DRONE-0${this.incident.drones.length + 1}`,
      name: droneNames[this.incident.drones.length - 1] || 'Sentinel Unit',
      status: 'launching',
      battery: 98,
      location: { ...DEALERSHIP_LOCATION, lat: DEALERSHIP_LOCATION.lat + (0.0001 * this.incident.drones.length) },
      altitude: 0,
      speed: 0,
      camera: { isRecording: false, angle: 0 },
      assignedTask: task || tasks[this.incident.drones.length - 1]
    };
    this.incident.drones.push(newDrone);
    this.addTimelineEvent({
      type: 'operator-action',
      title: `Deployed ${newDrone.name}`,
      description: `Additional drone deployed for ${task}`,
      severity: 'info'
    });

    setTimeout(() => {
      this.updateDrone(newDrone.id, {
        status: 'active',
        altitude: 18,
        speed: 7,
        camera: { isRecording: true, angle: 40 }
      });
    }, 3000);
  }

  dispatchSecurity() {
    this.addTimelineEvent({
      type: 'escalation',
      title: 'Security Team Dispatched',
      description: 'Ground response team en route with live intel feed',
      severity: 'info'
    });
  }

  contactPolice() {
    this.addTimelineEvent({
      type: 'escalation',
      title: 'Police Notified',
      description: 'Law enforcement contacted with real-time video feed and GPS coordinates',
      severity: 'warning'
    });
  }
}
