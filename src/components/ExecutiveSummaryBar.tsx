import { CheckCircle2, Flame, Heart, ShieldCheck } from "lucide-react";
import confetti from "canvas-confetti";
import type { DayRoutine } from "../types";

interface ExecutiveSummaryBarProps {
  currentRoutine: DayRoutine;
  isCompleted: boolean;
  onToggleComplete: () => void;
  completedDays: string[];
  totalCardioMinutes: number;
}

export const ExecutiveSummaryBar = ({
  currentRoutine,
  isCompleted,
  onToggleComplete,
  completedDays,
  totalCardioMinutes,
}: ExecutiveSummaryBarProps) => {
  const triggerCelebration = () => {
    onToggleComplete();
    if (!isCompleted) {
      confetti({
        particleCount: 90,
        spread: 65,
        origin: { y: 0.7 },
        colors: ["#006937", "#00A859", "#D4AF37", "#10B981", "#E5B869"],
      });
    }
  };

  const completedCount = completedDays.length;
  const targetCardioMinutes = 150;
  const cardioProgress = Math.min(100, Math.round((totalCardioMinutes / targetCardioMinutes) * 100));

  return (
    <div className="bg-[#091710] border border-[#143021] rounded-3xl p-4 sm:p-5 shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Left: Today's Brief */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#006937]/30 text-[#00A859] border border-[#006937]/60">
              {currentRoutine.day} Protocol
            </span>
            <span className="text-xs text-slate-300 font-medium">
              {currentRoutine.estimatedMinutes} Minutes
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              {currentRoutine.intensity} Stress Routine
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
            {currentRoutine.title}
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
            {currentRoutine.subtitle}
          </p>
        </div>

        {/* Right: Quick Action & Cardio Meter */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0 flex-wrap sm:flex-nowrap">
          {/* Zone 2 Cardio Meter */}
          <div className="bg-[#05110B] border border-[#143021] px-3.5 py-2 rounded-2xl flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#006937]/20 border border-[#008244]/30 flex items-center justify-center shrink-0">
              <Heart className="w-4 h-4 text-[#00A859]" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Zone 2 Cardio
              </div>
              <div className="text-xs font-bold text-white font-mono flex items-baseline gap-1">
                <span className="text-emerald-300">{totalCardioMinutes}m</span>
                <span className="text-[10px] text-slate-500 font-normal">/ {targetCardioMinutes}m</span>
              </div>
              <div className="w-20 bg-slate-800 h-1 rounded-full mt-1 overflow-hidden">
                <div
                  className="bg-[#00A859] h-full rounded-full transition-all duration-500"
                  style={{ width: `${cardioProgress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Mark Today Done Button */}
          <button
            onClick={triggerCelebration}
            className={`px-4 sm:px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xl transition-all active:scale-95 ${
              isCompleted
                ? "bg-[#00A859] hover:bg-emerald-400 text-slate-950 shadow-emerald-500/30 ring-2 ring-emerald-400/40"
                : "bg-gradient-to-r from-[#006937] via-[#008244] to-[#00A859] hover:brightness-110 text-white shadow-emerald-950/40 border border-[#00A859]/30"
            }`}
          >
            <CheckCircle2 className="w-4 h-4 fill-current" />
            <span>{isCompleted ? "Day Completed ✓" : "Mark Day Complete"}</span>
          </button>
        </div>

      </div>

      {/* Recovery Facility Tag */}
      <div className="mt-3 pt-3 border-t border-[#143021] flex items-center justify-between text-xs text-slate-400 flex-wrap gap-2">
        <div className="flex items-center gap-1.5">
          <Flame className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>Post-Workout Recovery:</span>
          <strong className="text-amber-300">{currentRoutine.recovery.title}</strong>
          <span className="text-slate-500">({currentRoutine.recovery.durationMinutes} min)</span>
        </div>
        <div className="text-slate-400 font-medium">
          Weekly Progress: <strong className="text-emerald-400 font-bold">{completedCount}/7 Days Logged</strong>
        </div>
      </div>
    </div>
  );
};
