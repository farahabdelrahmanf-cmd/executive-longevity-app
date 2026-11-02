import { useState } from "react";
import {
  ShieldCheck,
  Flame,
  CheckCircle2,
  Clock,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Play
} from "lucide-react";
import type { WarmUpProtocol } from "../types";

interface WarmUpCardProps {
  warmup: WarmUpProtocol;
  onOpenTimer: (seconds: number, label: string) => void;
}

export const WarmUpCard = ({ warmup, onOpenTimer }: WarmUpCardProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const toggleStep = (idx: number) => {
    setCompletedSteps((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const isAllCompleted = completedSteps.length === warmup.steps.length;

  return (
    <div className="bg-gradient-to-br from-amber-950/25 via-[#0D1B12] to-slate-900 border border-amber-500/40 rounded-3xl p-5 sm:p-6 shadow-xl relative overflow-hidden transition-all">
      {/* Decorative Warmth Glow */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1.5 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Age 60+ Joint Safety Protocol</span>
            </span>
            <span className="text-xs text-amber-400/90 font-mono flex items-center gap-1 font-semibold">
              <Clock className="w-3.5 h-3.5" />
              {warmup.durationMinutes} Minutes Required
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>{warmup.title}</span>
            {isAllCompleted && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Joints Primed
              </span>
            )}
          </h3>
        </div>

        {/* Action Controls: Quick Timer & Toggle */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => onOpenTimer(warmup.durationMinutes * 60, "Pre-Workout Warm-Up")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-bold text-xs shadow-md transition"
            title="Start countdown timer for warm-up"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Start Timer</span>
          </button>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition"
            aria-label="Toggle details"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Clinical Longevity Context (Executive Why) */}
      <div className="mt-3 p-3 rounded-2xl bg-black/40 border border-amber-500/20 text-xs text-slate-300 flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <span className="font-bold text-amber-300">Why You Never Skip Warm-Up:</span>
          <p className="text-slate-300 leading-relaxed font-medium">
            {warmup.executiveRationale}
          </p>
        </div>
      </div>

      {/* Step-by-Step Movement Sequence */}
      {isExpanded && (
        <div className="mt-4 space-y-2.5 pt-2 border-t border-emerald-900/40">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>Complete this 3-step sequence before touching any working resistance:</span>
          </p>

          <div className="grid grid-cols-1 gap-2.5">
            {warmup.steps.map((step, idx) => {
              const isDone = completedSteps.includes(idx);
              return (
                <div
                  key={idx}
                  onClick={() => toggleStep(idx)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                    isDone
                      ? "bg-emerald-950/40 border-emerald-500/40 opacity-80"
                      : "bg-slate-950/60 border-slate-800 hover:border-amber-400/50"
                  }`}
                >
                  {/* Step Checkbox */}
                  <div
                    className={`mt-0.5 w-5 h-5 rounded-lg flex items-center justify-center shrink-0 border transition ${
                      isDone
                        ? "bg-emerald-500 border-emerald-400 text-slate-950"
                        : "border-slate-600 bg-slate-900 text-transparent"
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 fill-current" />
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className={`text-xs font-bold ${isDone ? "text-emerald-300 line-through" : "text-white"}`}>
                        {idx + 1}. {step.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20">
                          {step.durationOrReps}
                        </span>
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                          Target: {step.jointFocus}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed font-normal">
                      {step.instructions}
                    </p>

                    {step.equipment && (
                      <p className="text-[11px] text-slate-400">
                        Equipment: <strong className="text-slate-200">{step.equipment}</strong>
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
