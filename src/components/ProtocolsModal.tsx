import { useState } from "react";
import { BookOpen, X, ShieldCheck, ChevronRight, CheckCircle2, Award } from "lucide-react";
import { LONGEVITY_PROTOCOLS } from "../data/longevityProtocols";
import type { ProtocolItem } from "../data/longevityProtocols";

interface ProtocolsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProtocolsModal = ({ isOpen, onClose }: ProtocolsModalProps) => {
  const [selectedId, setSelectedId] = useState<string>(LONGEVITY_PROTOCOLS[0].id);

  if (!isOpen) return null;

  const activeProtocol: ProtocolItem =
    LONGEVITY_PROTOCOLS.find((p) => p.id === selectedId) || LONGEVITY_PROTOCOLS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-2xl p-5 sm:p-7 shadow-2xl relative my-6 text-left">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/80 hover:bg-slate-750 transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 mb-1">
          <BookOpen className="w-5 h-5 text-amber-400" />
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-300">
            Science & Protocol Library
          </span>
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">
          Dr. Peter Attia & Dr. Andrew Huberman Longevity Framework
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Peer-reviewed medical protocols adapted for high-stress corporate leaders and joint longevity.
        </p>

        {/* Protocol Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-4">
          {LONGEVITY_PROTOCOLS.map((protocol) => (
            <button
              key={protocol.id}
              onClick={() => setSelectedId(protocol.id)}
              className={`p-2.5 rounded-xl border text-left transition ${
                protocol.id === selectedId
                  ? "bg-amber-500/20 border-amber-500/60 ring-1 ring-amber-500/30 text-amber-200"
                  : "bg-slate-800/40 hover:bg-slate-800/80 border-slate-800 text-slate-400"
              }`}
            >
              <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400 truncate">
                {protocol.badge}
              </div>
              <div className="text-xs font-bold text-slate-200 truncate mt-0.5">
                {protocol.title.split(":")[0]}
              </div>
              <div className="text-[10px] text-slate-500 truncate mt-0.5">
                {protocol.expert.split("(")[0]}
              </div>
            </button>
          ))}
        </div>

        {/* Active Protocol Content */}
        <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  {activeProtocol.badge}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {activeProtocol.expert}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                {activeProtocol.title}
              </h3>
            </div>
            <Award className="w-5 h-5 text-amber-400 shrink-0 mt-1" />
          </div>

          <p className="text-xs text-slate-300 leading-relaxed border-l-2 border-amber-500/40 pl-3 italic">
            {activeProtocol.summary}
          </p>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Core Biological Mechanisms</span>
            </h4>
            <div className="space-y-2">
              {activeProtocol.keyPoints.map((point, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{point}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800">
            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-2">
              Daily Executive Action Steps
            </h4>
            <div className="space-y-1.5">
              {activeProtocol.actionSteps.map((step, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                  <ChevronRight className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
