import { Battery, Navigation } from 'lucide-react';
import type { Drone } from '../types';

interface DroneCardProps {
  drone: Drone;
  isSelected: boolean;
  onSelect: () => void;
}

export default function DroneCard({ drone, isSelected, onSelect }: DroneCardProps) {
  const statusColors = {
    docked: 'text-gray-500',
    launching: 'text-yellow-400',
    active: 'text-green-400',
    returning: 'text-blue-400',
    offline: 'text-red-400'
  };

  return (
    <button
      onClick={onSelect}
      className={`flex-shrink-0 w-64 bg-gray-900/50 backdrop-blur-xl rounded-xl border transition-all ${
        isSelected ? 'border-red-500 shadow-lg shadow-red-500/20' : 'border-gray-800 hover:border-gray-700'
      } p-4 space-y-3`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="font-semibold text-sm">{drone.name}</div>
          <div className="text-xs text-gray-400">{drone.id}</div>
        </div>
        <div className={`flex items-center gap-1 text-xs font-medium ${statusColors[drone.status]}`}>
          <div className="w-1.5 h-1.5 rounded-full bg-current" />
          {drone.status}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-400">Altitude</span>
          <span className="font-medium">{drone.altitude}m</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-400">Speed</span>
          <span className="font-medium">{drone.speed}m/s</span>
        </div>
        <div className="flex items-center gap-2">
          <Battery className={`w-3 h-3 ${drone.battery > 50 ? 'text-green-400' : drone.battery > 20 ? 'text-yellow-400' : 'text-red-400'}`} />
          <div className="flex-1 bg-gray-800 rounded-full h-1.5 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                drone.battery > 50 ? 'bg-green-400' : drone.battery > 20 ? 'bg-yellow-400' : 'bg-red-400'
              }`}
              style={{ width: `${drone.battery}%` }}
            />
          </div>
          <span className="text-xs font-medium">{drone.battery}%</span>
        </div>
      </div>

      {drone.assignedTask && (
        <div className="pt-2 border-t border-gray-800">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Navigation className="w-3 h-3" />
            <span>{drone.assignedTask}</span>
          </div>
        </div>
      )}
    </button>
  );
}
