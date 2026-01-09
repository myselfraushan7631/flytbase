import { useEffect, useState } from 'react';
import { Eye, MapPin, Clock, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import type { Incident } from '../types';
import type { IncidentSimulation } from '../utils/simulation';

interface PhaseOneProps {
  incident: Incident;
  simulation: IncidentSimulation;
}

export default function PhaseOne({ incident, simulation }: PhaseOneProps) {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (elapsedTime >= 10 && !showConfirmation) {
      setShowConfirmation(true);
    }
  }, [elapsedTime, showConfirmation]);

  const handleConfirm = () => {
    simulation.confirmThreat();
  };

  const handleDismiss = () => {
    alert('False alarm - Incident dismissed (demo would end here)');
  };

  const latestDrone = incident.drones[0];
  const recentEvents = incident.timeline.slice(0, 3);

  return (
    <div className="h-screen flex">
      <div className="flex-1 relative bg-gradient-to-br from-gray-950 via-black to-gray-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.1)_0%,transparent_70%)]" />

        <div className="relative h-full flex items-center justify-center p-12">
          <div className="max-w-4xl w-full space-y-8">
            <div className="text-center space-y-4 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/40 rounded-full text-red-400 text-sm font-medium">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                INTRUSION DETECTED
              </div>

              <h1 className="text-6xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  Autonomous Response
                </span>
                <br />
                <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                  In Progress
                </span>
              </h1>

              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                {incident.aiSummary}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-800 space-y-3">
                <div className="flex items-center gap-2 text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">Time Elapsed</span>
                </div>
                <div className="text-4xl font-bold text-white">
                  {elapsedTime}s
                </div>
                <div className="text-xs text-gray-500">Target: {'<'}60s assessment</div>
              </div>

              <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-800 space-y-3">
                <div className="flex items-center gap-2 text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">Location</span>
                </div>
                <div className="text-2xl font-bold text-white">
                  Zone C
                </div>
                <div className="text-xs text-gray-500">High-value inventory</div>
              </div>

              <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-800 space-y-3">
                <div className="flex items-center gap-2 text-gray-400">
                  <Eye className="w-4 h-4" />
                  <span className="text-sm">Drone Status</span>
                </div>
                <div className="text-2xl font-bold text-white capitalize">
                  {latestDrone.status}
                </div>
                <div className="text-xs text-gray-500">{latestDrone.name}</div>
              </div>
            </div>

            <div className="bg-gray-900/30 backdrop-blur-xl rounded-2xl border border-gray-800 overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-gray-900 to-black relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-50" />

                {latestDrone.camera.isRecording && (
                  <>
                    <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-red-600 rounded-full text-white text-xs font-medium">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      LIVE
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <div className="w-32 h-32 rounded-full border-4 border-red-500/30 animate-pulse flex items-center justify-center">
                          <Eye className="w-12 h-12 text-red-500" />
                        </div>
                        <div className="text-white font-medium">Visual Confirmation in Progress</div>
                        <div className="text-sm text-gray-400">AI analyzing live drone feed...</div>
                      </div>
                    </div>
                  </>
                )}

                {!latestDrone.camera.isRecording && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-gray-500">Drone launching...</div>
                  </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>ALT: {latestDrone.altitude}m</span>
                    <span>SPEED: {latestDrone.speed}m/s</span>
                    <span>BATTERY: {latestDrone.battery}%</span>
                    <span>CAM: {latestDrone.camera.angle}°</span>
                  </div>
                </div>
              </div>
            </div>

            {showConfirmation && incident.status !== 'responding' && (
              <div className="flex gap-4 animate-fade-in">
                <button
                  onClick={handleConfirm}
                  className="flex-1 flex items-center justify-center gap-3 px-8 py-5 bg-red-600 hover:bg-red-700 rounded-xl font-semibold transition-all transform hover:scale-[1.02] shadow-lg shadow-red-600/50"
                >
                  <CheckCircle className="w-5 h-5" />
                  Confirm Threat - Escalate Response
                </button>
                <button
                  onClick={handleDismiss}
                  className="flex items-center justify-center gap-3 px-8 py-5 bg-gray-800 hover:bg-gray-700 rounded-xl font-semibold transition-all"
                >
                  <XCircle className="w-5 h-5" />
                  False Alarm
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-96 bg-black border-l border-gray-900 p-6 space-y-6 overflow-y-auto">
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Live Activity</h3>
          <div className="space-y-2">
            {recentEvents.map((event) => (
              <div
                key={event.id}
                className="p-4 bg-gray-900/50 rounded-xl border border-gray-800 space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {event.severity === 'critical' && <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />}
                    <span className="text-sm font-medium">{event.title}</span>
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {new Date(event.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-xs text-gray-400">{event.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">AI Assessment</h3>
          <div className="p-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
            <p className="text-sm text-gray-300 leading-relaxed">
              {incident.aiInsights[0]?.message || 'Analyzing situation...'}
            </p>
            {incident.aiInsights[0] && (
              <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
                <div className="flex-1 bg-gray-800 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-blue-500 h-full rounded-full transition-all"
                    style={{ width: `${incident.aiInsights[0].confidence * 100}%` }}
                  />
                </div>
                <span>{Math.round(incident.aiInsights[0].confidence * 100)}% confidence</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
