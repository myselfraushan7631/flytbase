import { FileVideo, Image, Thermometer, FileText, Download, Tag, Clock, MapPin } from 'lucide-react';
import type { Incident, Evidence } from '../types';
import type { IncidentSimulation } from '../utils/simulation';

interface PhaseThreeProps {
  incident: Incident;
  simulation: IncidentSimulation;
}

export default function PhaseThree({ incident, simulation }: PhaseThreeProps) {
  const evidenceByType = incident.evidence.reduce((acc, item) => {
    if (!acc[item.type]) acc[item.type] = [];
    acc[item.type].push(item);
    return acc;
  }, {} as Record<string, Evidence[]>);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return FileVideo;
      case 'photo': return Image;
      case 'thermal': return Thermometer;
      default: return FileText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'text-blue-400';
      case 'photo': return 'text-purple-400';
      case 'thermal': return 'text-orange-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="h-screen flex">
      <div className="flex-1 p-6 overflow-y-auto bg-gradient-to-br from-gray-950 via-black to-gray-950">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">Evidence Documentation</h2>
              <p className="text-gray-400">
                Real-time capture and cataloging of incident evidence
              </p>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-xl font-semibold transition-all">
              <Download className="w-5 h-5" />
              Export Evidence Package
            </button>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-xl p-6 border border-gray-800">
              <div className="text-gray-400 text-sm mb-2">Total Evidence</div>
              <div className="text-4xl font-bold">{incident.evidence.length}</div>
              <div className="text-xs text-gray-500 mt-1">items captured</div>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-xl p-6 border border-gray-800">
              <div className="text-gray-400 text-sm mb-2">Critical Items</div>
              <div className="text-4xl font-bold text-red-400">
                {incident.evidence.filter(e => e.critical).length}
              </div>
              <div className="text-xs text-gray-500 mt-1">high priority</div>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-xl p-6 border border-gray-800">
              <div className="text-gray-400 text-sm mb-2">Avg Confidence</div>
              <div className="text-4xl font-bold text-green-400">
                {incident.evidence.length > 0
                  ? Math.round((incident.evidence.reduce((sum, e) => sum + e.confidence, 0) / incident.evidence.length) * 100)
                  : 0}%
              </div>
              <div className="text-xs text-gray-500 mt-1">AI validation</div>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-xl p-6 border border-gray-800">
              <div className="text-gray-400 text-sm mb-2">Duration</div>
              <div className="text-4xl font-bold">
                {Math.floor((Date.now() - incident.startTime.getTime()) / 60000)}m
              </div>
              <div className="text-xs text-gray-500 mt-1">incident time</div>
            </div>
          </div>

          {Object.entries(evidenceByType).map(([type, items]) => {
            const Icon = getTypeIcon(type);
            const color = getTypeColor(type);

            return (
              <div key={type} className="space-y-3">
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${color}`} />
                  <h3 className="text-lg font-semibold capitalize">{type} Evidence</h3>
                  <span className="text-sm text-gray-400">({items.length} items)</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {items.map((evidence) => (
                    <div
                      key={evidence.id}
                      className={`bg-gray-900/50 backdrop-blur-xl rounded-xl p-5 border transition-all hover:border-gray-600 ${
                        evidence.critical ? 'border-red-500/50' : 'border-gray-800'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Icon className={`w-4 h-4 ${color}`} />
                          <span className="text-sm font-medium capitalize">{evidence.type}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {evidence.critical && (
                            <span className="px-2 py-0.5 bg-red-500/20 border border-red-500/40 rounded text-xs text-red-400 font-medium">
                              CRITICAL
                            </span>
                          )}
                          <span className="text-xs text-gray-400">
                            {Math.round(evidence.confidence * 100)}%
                          </span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <p className="text-sm text-gray-300 leading-relaxed">
                          {evidence.description}
                        </p>

                        <div className="flex flex-wrap gap-1.5">
                          {evidence.tags.map((tag) => (
                            <div
                              key={tag}
                              className="flex items-center gap-1 px-2 py-1 bg-gray-800/50 rounded-md text-xs text-gray-400"
                            >
                              <Tag className="w-3 h-3" />
                              {tag}
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3 h-3" />
                            {new Date(evidence.timestamp).toLocaleTimeString()}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3 h-3" />
                            {evidence.droneId}
                          </div>
                        </div>

                        <div className="flex-1 bg-gray-800 rounded-full h-1.5 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              evidence.confidence > 0.9 ? 'bg-green-500' :
                              evidence.confidence > 0.7 ? 'bg-blue-500' :
                              'bg-yellow-500'
                            }`}
                            style={{ width: `${evidence.confidence * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {incident.evidence.length === 0 && (
            <div className="h-96 flex items-center justify-center">
              <div className="text-center space-y-3">
                <FileText className="w-16 h-16 text-gray-700 mx-auto" />
                <div className="text-xl font-semibold text-gray-600">No Evidence Captured Yet</div>
                <div className="text-sm text-gray-500">Evidence will appear here as drones document the incident</div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="w-96 bg-black border-l border-gray-900 p-6 space-y-6 overflow-y-auto">
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Timeline</h3>
          <div className="space-y-3">
            {incident.timeline.slice(0, 10).map((event, idx) => (
              <div key={event.id} className="relative pl-6">
                {idx !== incident.timeline.slice(0, 10).length - 1 && (
                  <div className="absolute left-2 top-6 bottom-0 w-px bg-gray-800" />
                )}
                <div className={`absolute left-0 top-1.5 w-4 h-4 rounded-full border-2 ${
                  event.severity === 'critical' ? 'bg-red-500 border-red-400' :
                  event.severity === 'warning' ? 'bg-yellow-500 border-yellow-400' :
                  'bg-blue-500 border-blue-400'
                }`} />
                <div className="space-y-1">
                  <div className="text-xs text-gray-500">
                    {new Date(event.timestamp).toLocaleTimeString()}
                  </div>
                  <div className="text-sm font-medium">{event.title}</div>
                  <div className="text-xs text-gray-400">{event.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Export Options</h3>
          <div className="space-y-2">
            <button className="w-full px-4 py-3 bg-gray-900 hover:bg-gray-800 rounded-xl text-left text-sm transition-all">
              <div className="font-medium mb-1">Law Enforcement Package</div>
              <div className="text-xs text-gray-400">All evidence with chain of custody</div>
            </button>
            <button className="w-full px-4 py-3 bg-gray-900 hover:bg-gray-800 rounded-xl text-left text-sm transition-all">
              <div className="font-medium mb-1">Insurance Report</div>
              <div className="text-xs text-gray-400">Incident summary and documentation</div>
            </button>
            <button className="w-full px-4 py-3 bg-gray-900 hover:bg-gray-800 rounded-xl text-left text-sm transition-all">
              <div className="font-medium mb-1">Internal Review</div>
              <div className="text-xs text-gray-400">Complete operational log</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
