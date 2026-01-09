import { MapPin, Activity, Eye } from 'lucide-react';
import type { Intruder } from '../types';

interface IntruderTrackerProps {
  intruder: Intruder;
}

export default function IntruderTracker({ intruder }: IntruderTrackerProps) {
  return (
    <div className="p-4 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-xl border border-red-500/30 space-y-3">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="font-semibold text-sm">{intruder.id}</div>
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            {intruder.trackingActive ? (
              <>
                <Eye className="w-3 h-3 text-green-400" />
                <span className="text-green-400">Tracking Active</span>
              </>
            ) : (
              <>
                <Eye className="w-3 h-3 text-gray-400" />
                <span>Last Known Position</span>
              </>
            )}
          </div>
        </div>
        <div className="text-xs font-medium text-gray-400">
          {Math.round(intruder.confidence * 100)}% match
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-sm text-gray-300">{intruder.description}</div>
        <div className="flex items-center gap-2 text-xs">
          <Activity className="w-3 h-3 text-orange-400" />
          <span className="text-orange-400">{intruder.behavior}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <MapPin className="w-3 h-3" />
          <span>
            {intruder.lastSeen.lat.toFixed(5)}, {intruder.lastSeen.lng.toFixed(5)}
          </span>
        </div>
      </div>

      <div className="flex-1 bg-gray-800 rounded-full h-1.5 overflow-hidden">
        <div
          className="bg-red-500 h-full rounded-full transition-all"
          style={{ width: `${intruder.confidence * 100}%` }}
        />
      </div>
    </div>
  );
}
