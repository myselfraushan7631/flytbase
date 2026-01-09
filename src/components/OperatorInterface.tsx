import { useState, useEffect } from 'react';
import { AlertCircle, Radio, Activity } from 'lucide-react';
import type { Incident } from '../types';
import { createInitialIncident, IncidentSimulation } from '../utils/simulation';
import PhaseOne from './PhaseOne';
import PhaseTwo from './PhaseTwo';
import PhaseThree from './PhaseThree';
import AIAssistant from './AIAssistant';

export default function OperatorInterface() {
  const [incident, setIncident] = useState<Incident | null>(null);
  const [simulation, setSimulation] = useState<IncidentSimulation | null>(null);
  const [phase, setPhase] = useState<1 | 2 | 3>(1);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    if (!isStarted) return;

    const initialIncident = createInitialIncident();
    const sim = new IncidentSimulation(initialIncident);

    const unsubscribe = sim.subscribe((updatedIncident) => {
      setIncident(updatedIncident);

      if (updatedIncident.status === 'confirmed' && phase === 1) {
        setPhase(2);
      } else if (updatedIncident.status === 'responding' && phase === 2 && updatedIncident.drones.length > 1) {
        setPhase(3);
      }
    });

    sim.start();
    setSimulation(sim);
    setIncident(initialIncident);

    return () => {
      sim.stop();
      unsubscribe();
    };
  }, [isStarted]);

  if (!isStarted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-8">
        <div className="max-w-3xl text-center space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full text-red-400 text-sm">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              FlytBase Autonomous Security System
            </div>
            <h1 className="text-5xl font-bold text-white tracking-tight">
              AI-Native Security Operations
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              Experience autonomous drone response to a live intrusion at a luxury dealership.
              From detection to resolution in under 90 seconds.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6 py-8">
            <div className="space-y-2 text-left p-6 bg-gray-900/50 rounded-xl border border-gray-800">
              <div className="text-3xl font-bold text-white">0-60s</div>
              <div className="text-sm text-gray-400">Alert → Assessment</div>
              <div className="text-xs text-gray-500">AI validates threat, drone launches</div>
            </div>
            <div className="space-y-2 text-left p-6 bg-gray-900/50 rounded-xl border border-gray-800">
              <div className="text-3xl font-bold text-white">60s-5m</div>
              <div className="text-sm text-gray-400">Active Response</div>
              <div className="text-xs text-gray-500">Multi-drone coordination</div>
            </div>
            <div className="space-y-2 text-left p-6 bg-gray-900/50 rounded-xl border border-gray-800">
              <div className="text-3xl font-bold text-white">Real-time</div>
              <div className="text-sm text-gray-400">Evidence Capture</div>
              <div className="text-xs text-gray-500">Automatic documentation</div>
            </div>
          </div>

          <button
            onClick={() => setIsStarted(true)}
            className="px-12 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-all transform hover:scale-105 shadow-lg shadow-red-600/50"
          >
            Begin Simulation
          </button>

          <p className="text-xs text-gray-600">
            This is a design prototype demonstrating AI-native security operations
          </p>
        </div>
      </div>
    );
  }

  if (!incident || !simulation) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex items-center gap-3 text-white">
          <Activity className="w-6 h-6 animate-pulse" />
          <span>Initializing autonomous systems...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <header className="border-b border-gray-900 bg-black/80 backdrop-blur-xl fixed top-0 left-0 right-0 z-50">
        <div className="px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Radio className="w-5 h-5 text-red-500" />
              <span className="font-semibold">FlytBase Ops</span>
            </div>
            <div className="h-4 w-px bg-gray-800" />
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500">Site:</span>
              <span className="font-medium">{incident.siteName}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500">Incident:</span>
              <span className="font-mono text-xs">{incident.id}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {[1, 2, 3].map((p) => (
                <div
                  key={p}
                  className={`w-2 h-2 rounded-full transition-all ${
                    p === phase ? 'bg-red-500 w-8' : p < phase ? 'bg-gray-600' : 'bg-gray-800'
                  }`}
                />
              ))}
            </div>
            <div className="text-sm">
              <span className="text-gray-500">Phase {phase}:</span>{' '}
              <span className="font-medium">
                {phase === 1 ? 'Assessment' : phase === 2 ? 'Response' : 'Documentation'}
              </span>
            </div>
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${
              incident.threatLevel === 'critical' ? 'bg-red-500/20 text-red-400' :
              incident.threatLevel === 'high' ? 'bg-orange-500/20 text-orange-400' :
              'bg-yellow-500/20 text-yellow-400'
            }`}>
              <AlertCircle className="w-3 h-3" />
              {incident.threatLevel.toUpperCase()}
            </div>
          </div>
        </div>
      </header>

      <main className="pt-16">
        {phase === 1 && <PhaseOne incident={incident} simulation={simulation} />}
        {phase === 2 && <PhaseTwo incident={incident} simulation={simulation} />}
        {phase === 3 && <PhaseThree incident={incident} simulation={simulation} />}
      </main>

      <AIAssistant incident={incident} simulation={simulation} phase={phase} />
    </div>
  );
}
