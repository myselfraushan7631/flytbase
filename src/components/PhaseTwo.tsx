import { useState } from 'react';
import { Radio, Users, Camera, Crosshair, Phone, Shield, Plus } from 'lucide-react';
import type { Incident } from '../types';
import type { IncidentSimulation } from '../utils/simulation';
import DroneCard from './DroneCard';
import IntruderTracker from './IntruderTracker';

interface PhaseTwoProps {
  incident: Incident;
  simulation: IncidentSimulation;
}

export default function PhaseTwo({ incident, simulation }: PhaseTwoProps) {
  const [selectedDrone, setSelectedDrone] = useState<string | null>(incident.drones[0]?.id);
  const [showDeployMenu, setShowDeployMenu] = useState(false);

  const handleDeployDrone = (task: string) => {
    simulation.deployDrone(task);
    setShowDeployMenu(false);
  };

  const handleDispatchSecurity = () => {
    simulation.dispatchSecurity();
  };

  const handleContactPolice = () => {
    simulation.contactPolice();
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col">
          <div className="flex-1 bg-gradient-to-br from-gray-950 via-black to-gray-950 relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.05)_0%,transparent_70%)]" />

            <div className="relative h-full p-6">
              <div className="h-full bg-gray-900/30 backdrop-blur-xl rounded-2xl border border-gray-800 overflow-hidden flex flex-col">
                <div className="p-4 border-b border-gray-800 flex items-center justify-between bg-black/40">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Camera className="w-4 h-4 text-red-500" />
                      <span className="font-semibold">Primary Feed</span>
                    </div>
                    {selectedDrone && (
                      <div className="text-sm text-gray-400">
                        {incident.drones.find(d => d.id === selectedDrone)?.name}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-red-600 rounded-full text-white text-xs font-medium">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    LIVE
                  </div>
                </div>

                <div className="flex-1 relative overflow-hidden bg-gradient-to-br from-gray-900 to-black">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30" />

                  {incident.intruders.length > 0 && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        {incident.intruders.map((intruder, idx) => (
                          <div
                            key={intruder.id}
                            className="absolute"
                            style={{
                              left: `${idx * 120}px`,
                              top: `${idx * 60}px`
                            }}
                          >
                            <div className="relative w-48 h-48">
                              <div className="absolute inset-0 rounded-full border-2 border-red-500 animate-ping opacity-20" />
                              <div className="absolute inset-0 rounded-full border-2 border-red-500" />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Crosshair className="w-12 h-12 text-red-500 animate-pulse" />
                              </div>
                              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-red-600 px-3 py-1 rounded-full text-xs font-medium">
                                TARGET {idx + 1}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="absolute top-4 left-4 right-4 flex gap-3">
                    {incident.drones.filter(d => d.status === 'active').slice(1, 4).map((drone) => (
                      <div
                        key={drone.id}
                        onClick={() => setSelectedDrone(drone.id)}
                        className="w-48 h-32 bg-black/60 backdrop-blur-xl rounded-lg border border-gray-700 cursor-pointer hover:border-red-500 transition-all overflow-hidden"
                      >
                        <div className="h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative">
                          <Camera className="w-8 h-8 text-gray-600" />
                          <div className="absolute top-2 left-2 text-xs font-medium">{drone.name}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 grid grid-cols-4 gap-4 text-xs">
                    <div className="bg-black/60 backdrop-blur-xl rounded-lg p-3 border border-gray-700">
                      <div className="text-gray-400 mb-1">Intruders Detected</div>
                      <div className="text-2xl font-bold">{incident.intruders.length}</div>
                    </div>
                    <div className="bg-black/60 backdrop-blur-xl rounded-lg p-3 border border-gray-700">
                      <div className="text-gray-400 mb-1">Drones Active</div>
                      <div className="text-2xl font-bold">{incident.drones.filter(d => d.status === 'active').length}</div>
                    </div>
                    <div className="bg-black/60 backdrop-blur-xl rounded-lg p-3 border border-gray-700">
                      <div className="text-gray-400 mb-1">Evidence Items</div>
                      <div className="text-2xl font-bold">{incident.evidence.length}</div>
                    </div>
                    <div className="bg-black/60 backdrop-blur-xl rounded-lg p-3 border border-gray-700">
                      <div className="text-gray-400 mb-1">Threat Level</div>
                      <div className="text-2xl font-bold text-red-400">{incident.threatLevel.toUpperCase()}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="h-48 border-t border-gray-900 bg-black p-4">
            <div className="flex items-center gap-3 mb-3">
              <Radio className="w-4 h-4 text-gray-400" />
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Active Drones</h3>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {incident.drones.map((drone) => (
                <DroneCard
                  key={drone.id}
                  drone={drone}
                  isSelected={selectedDrone === drone.id}
                  onSelect={() => setSelectedDrone(drone.id)}
                />
              ))}

              <button
                onClick={() => setShowDeployMenu(true)}
                className="flex-shrink-0 w-48 h-full bg-gray-900/50 hover:bg-gray-900 border-2 border-dashed border-gray-700 hover:border-gray-600 rounded-xl transition-all flex flex-col items-center justify-center gap-2 group"
              >
                <Plus className="w-6 h-6 text-gray-600 group-hover:text-gray-400" />
                <span className="text-sm text-gray-600 group-hover:text-gray-400">Deploy Drone</span>
              </button>
            </div>
          </div>
        </div>

        <div className="w-96 bg-black border-l border-gray-900 flex flex-col">
          <div className="p-6 space-y-4 flex-1 overflow-y-auto">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-400" />
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Intruder Tracking</h3>
              </div>
              {incident.intruders.map((intruder) => (
                <IntruderTracker key={intruder.id} intruder={intruder} />
              ))}
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Quick Actions</h3>
              <button
                onClick={handleDispatchSecurity}
                className="w-full flex items-center justify-between px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5" />
                  <span className="font-medium">Dispatch Security Team</span>
                </div>
              </button>
              <button
                onClick={handleContactPolice}
                className="w-full flex items-center justify-between px-4 py-3 bg-red-600 hover:bg-red-700 rounded-xl transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5" />
                  <span className="font-medium">Contact Police</span>
                </div>
              </button>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Recent Activity</h3>
              <div className="space-y-2">
                {incident.timeline.slice(0, 5).map((event) => (
                  <div
                    key={event.id}
                    className="p-3 bg-gray-900/50 rounded-lg border border-gray-800 space-y-1"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-medium">{event.title}</span>
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        {new Date(event.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">{event.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showDeployMenu && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-8">
          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 max-w-2xl w-full space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Deploy Additional Drone</h2>
              <p className="text-gray-400 text-sm">Select a specialized task for the new drone unit</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleDeployDrone('Perimeter surveillance')}
                className="p-6 bg-gray-800 hover:bg-gray-750 rounded-xl border border-gray-700 hover:border-red-500 transition-all text-left space-y-2"
              >
                <div className="text-lg font-semibold">Perimeter Surveillance</div>
                <p className="text-sm text-gray-400">Monitor all exit points and potential escape routes</p>
              </button>

              <button
                onClick={() => handleDeployDrone('Thermal imaging')}
                className="p-6 bg-gray-800 hover:bg-gray-750 rounded-xl border border-gray-700 hover:border-red-500 transition-all text-left space-y-2"
              >
                <div className="text-lg font-semibold">Thermal Imaging</div>
                <p className="text-sm text-gray-400">Enhanced detection in low-visibility conditions</p>
              </button>

              <button
                onClick={() => handleDeployDrone('Evidence capture')}
                className="p-6 bg-gray-800 hover:bg-gray-750 rounded-xl border border-gray-700 hover:border-red-500 transition-all text-left space-y-2"
              >
                <div className="text-lg font-semibold">Evidence Capture</div>
                <p className="text-sm text-gray-400">High-resolution documentation for legal proceedings</p>
              </button>

              <button
                onClick={() => handleDeployDrone('Intruder tracking')}
                className="p-6 bg-gray-800 hover:bg-gray-750 rounded-xl border border-gray-700 hover:border-red-500 transition-all text-left space-y-2"
              >
                <div className="text-lg font-semibold">Intruder Tracking</div>
                <p className="text-sm text-gray-400">Maintain continuous visual contact with suspects</p>
              </button>
            </div>

            <button
              onClick={() => setShowDeployMenu(false)}
              className="w-full px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
