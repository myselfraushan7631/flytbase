import { useState } from 'react';
import { Bot, ChevronUp, ChevronDown, Sparkles, TrendingUp } from 'lucide-react';
import type { Incident } from '../types';
import type { IncidentSimulation } from '../utils/simulation';

interface AIAssistantProps {
  incident: Incident;
  simulation: IncidentSimulation;
  phase: 1 | 2 | 3;
}

export default function AIAssistant({ incident, phase }: AIAssistantProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const getPhaseInsights = () => {
    switch (phase) {
      case 1:
        return {
          title: 'Threat Assessment',
          insights: [
            'Motion patterns consistent with unauthorized entry',
            'No match found in authorized personnel database',
            'Zone C contains $2.3M in high-value inventory',
            'Optimal weather conditions for drone surveillance'
          ]
        };
      case 2:
        return {
          title: 'Response Coordination',
          insights: [
            `${incident.intruders.length} active targets being tracked`,
            `${incident.drones.filter(d => d.status === 'active').length} drones operational`,
            'Recommended: Deploy perimeter surveillance',
            'Ground team ETA: 4 minutes'
          ]
        };
      case 3:
        return {
          title: 'Evidence Analysis',
          insights: [
            `${incident.evidence.length} evidence items captured`,
            `${incident.evidence.filter(e => e.critical).length} critical items for prosecution`,
            'All footage meets legal admissibility standards',
            'Chain of custody automatically maintained'
          ]
        };
    }
  };

  const insights = getPhaseInsights();
  const latestInsight = incident.aiInsights[0];

  return (
    <div className="fixed bottom-6 right-6 w-96 z-50">
      <div className={`bg-gradient-to-br from-gray-900 to-black backdrop-blur-xl rounded-2xl border border-gray-700 shadow-2xl shadow-black/50 transition-all ${
        isExpanded ? 'h-auto' : 'h-16'
      }`}>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-all rounded-t-2xl"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <div className="font-semibold">AI Copilot</div>
              <div className="text-xs text-gray-400">{insights.title}</div>
            </div>
          </div>
          {isExpanded ? (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          )}
        </button>

        {isExpanded && (
          <div className="px-6 pb-6 space-y-4">
            {latestInsight && (
              <div className="p-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20 space-y-3">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 space-y-2">
                    <p className="text-sm text-gray-200 leading-relaxed">
                      {latestInsight.message}
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-800 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-blue-500 h-full rounded-full transition-all"
                          style={{ width: `${latestInsight.confidence * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-400">
                        {Math.round(latestInsight.confidence * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-gray-400 uppercase tracking-wider">
                <TrendingUp className="w-3 h-3" />
                <span>Real-time Analysis</span>
              </div>
              <div className="space-y-2">
                {insights.insights.map((insight, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 p-3 bg-gray-800/50 rounded-lg text-sm text-gray-300"
                  >
                    <div className="w-1 h-1 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <span>{insight}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-gray-800">
              <div className="text-xs text-gray-500 text-center">
                Powered by FlytBase AI
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
