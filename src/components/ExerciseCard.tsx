import { useState, useEffect } from "react";
import {
  Dumbbell,
  Heart,
  RotateCcw,
  Sparkles,
  Timer,
  Check,
  ShieldCheck,
  Zap,
  Eye,
  EyeOff
} from "lucide-react";
import type { Exercise, ExerciseSet } from "../types";
import { getLoggedSets, saveLoggedSets } from "../utils/storage";
import { ExerciseMotionVisual } from "./ExerciseMotionVisual";

interface ExerciseCardProps {
  exercise: Exercise;
  onOpenTimer: (seconds: number, exerciseName: string) => void;
  onSetCompleted?: () => void;
}

export const ExerciseCard = ({
  exercise,
  onOpenTimer,
  onSetCompleted,
}: ExerciseCardProps) => {
  const [sets, setSets] = useState<ExerciseSet[]>(() => {
    const saved = getLoggedSets(exercise.id);
    return saved && saved.length > 0 ? saved : exercise.defaultSets;
  });

  const [showVisual, setShowVisual] = useState<boolean>(true);

  useEffect(() => {
    const saved = getLoggedSets(exercise.id);
    setSets(saved && saved.length > 0 ? saved : exercise.defaultSets);
  }, [exercise.id, exercise.defaultSets]);

  const handleToggleSet = (index: number) => {
    const updated = [...sets];
    const isNowComplete = !updated[index].completed;
    updated[index].completed = isNowComplete;
    setSets(updated);
    saveLoggedSets(exercise.id, updated);

    if (isNowComplete) {
      if (onSetCompleted) onSetCompleted();
      if (index < sets.length - 1 && exercise.restSeconds > 0) {
        onOpenTimer(exercise.restSeconds, `${exercise.name} (Set ${index + 1} Complete)`);
      }
    }
  };

  const handleUpdateWeight = (index: number, weight: number | undefined) => {
    const updated = [...sets];
    updated[index].loggedWeight = weight;
    setSets(updated);
    saveLoggedSets(exercise.id, updated);
  };

  const handleUpdateReps = (index: number, reps: number | undefined) => {
    const updated = [...sets];
    updated[index].loggedReps = reps;
    setSets(updated);
    saveLoggedSets(exercise.id, updated);
  };

  const completedCount = sets.filter((s) => s.completed).length;
  const isAllComplete = sets.length > 0 && completedCount === sets.length;

  const getCategoryIcon = () => {
    switch (exercise.category) {
      case "cardio":
        return <Heart className="w-4 h-4 text-emerald-400" />;
      case "mobility":
        return <RotateCcw className="w-4 h-4 text-cyan-400" />;
      case "recovery":
        return <Sparkles className="w-4 h-4 text-amber-400" />;
      default:
        return <Dumbbell className="w-4 h-4 text-[#00A859]" />;
    }
  };

  return (
    <div
      className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
        isAllComplete
          ? "bg-[#07130D]/60 border-emerald-500/40 shadow-md shadow-emerald-950/20"
          : "bg-[#09160F] border-[#143021] hover:border-[#008244]/60 shadow-xl"
      }`}
    >
      {/* Exercise Header */}
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-1.5">
              <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#051C12] text-[#00A859] border border-[#006937]/50">
                {getCategoryIcon()}
                <span>{exercise.category}</span>
              </span>
              <span className="text-xs text-amber-300 font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30">
                {exercise.equipment}
              </span>
              {isAllComplete && (
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 stroke-[3]" /> Completed
                </span>
              )}
            </div>

            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug">
              {exercise.name}
            </h3>

            {/* High-Level Executive "Why" Banner */}
            <div className="mt-2.5 p-2.5 rounded-xl bg-[#006937]/15 border border-[#008244]/30 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-[#00A859] shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-bold text-[#00A859] mr-1">Why you do this:</span>
                <span className="text-slate-200 leading-relaxed">{exercise.quickWhy}</span>
              </div>
            </div>

            {/* Quick Stats: Target sets, reps, tempo */}
            <div className="flex items-center gap-3 sm:gap-4 mt-3 text-xs text-slate-300 flex-wrap">
              <div className="flex items-center gap-1">
                <span className="text-slate-400 font-medium">Target:</span>
                <span className="text-white font-bold">{exercise.targetSets} sets × {exercise.targetReps}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-slate-400 font-medium">Tempo:</span>
                <span className="text-amber-300 font-mono font-medium">{exercise.tempo}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-slate-400 font-medium">Effort:</span>
                <span className="text-emerald-400 font-medium">{exercise.rpe}</span>
              </div>
            </div>
          </div>

          {/* Right Action: Rest Timer + Toggle Visual Button */}
          <div className="flex flex-col items-end gap-2 shrink-0">
            {exercise.restSeconds > 0 && (
              <button
                onClick={() => onOpenTimer(exercise.restSeconds, exercise.name)}
                className="p-2 sm:px-3 sm:py-2 rounded-xl bg-[#0E2419] hover:bg-[#143525] text-slate-200 hover:text-amber-300 border border-[#17452B] transition flex items-center gap-1.5 active:scale-95 text-xs font-semibold"
                title={`Start ${exercise.restSeconds}s rest timer`}
              >
                <Timer className="w-4 h-4 text-amber-400" />
                <span className="hidden sm:inline">{exercise.restSeconds}s Rest</span>
              </button>
            )}

            <button
              onClick={() => setShowVisual(!showVisual)}
              className="text-[11px] font-semibold text-[#00A859] hover:text-emerald-300 flex items-center gap-1 px-2 py-1 rounded-lg bg-[#006937]/20 border border-[#006937]/40 transition active:scale-95"
            >
              {showVisual ? (
                <>
                  <EyeOff className="w-3.5 h-3.5" />
                  <span>Hide Motion</span>
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5" />
                  <span>Show Motion & Form</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Visual Animation & Safety Checklist (Expanded) */}
        {showVisual && (
          <ExerciseMotionVisual
            visualKey={exercise.visualKey}
            exerciseName={exercise.name}
            equipment={exercise.equipment}
            tempo={exercise.tempo}
            formKeys={exercise.formKeys || []}
            avoidKeys={exercise.avoidKeys || []}
          />
        )}
      </div>

      {/* Interactive Sets Tracking Table */}
      <div className="bg-[#05100B]/90 border-t border-[#143021] px-4 py-3 sm:px-5">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Active Set Log ({completedCount}/{sets.length} complete)</span>
          </span>
          <span className="text-[11px] text-slate-400">Auto-saved to device</span>
        </div>

        <div className="space-y-2">
          {sets.map((set, idx) => (
            <div
              key={set.setNumber}
              className={`flex items-center justify-between gap-2 p-2 rounded-xl border transition-all ${
                set.completed
                  ? "bg-[#062415] border-[#00A859]/50 text-emerald-100"
                  : "bg-[#0B1A12] border-[#143021] text-slate-200"
              }`}
            >
              {/* Set Label */}
              <div className="flex items-center gap-2 min-w-[70px]">
                <span className="w-6 h-6 rounded-lg bg-[#05100B] text-amber-300 font-mono text-xs flex items-center justify-center font-bold border border-[#143021]">
                  {set.setNumber}
                </span>
                <span className="text-xs text-slate-300 font-medium">
                  {set.targetReps}
                </span>
              </div>

              {/* Input: Weight (kg) */}
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  placeholder="kg"
                  value={set.loggedWeight !== undefined ? set.loggedWeight : ""}
                  onChange={(e) =>
                    handleUpdateWeight(
                      idx,
                      e.target.value ? parseFloat(e.target.value) : undefined
                    )
                  }
                  className="w-16 sm:w-20 px-2 py-1.5 text-xs bg-[#05100B] border border-[#143021] rounded-lg text-white font-semibold text-center focus:outline-none focus:ring-1 focus:ring-[#00A859]"
                />
                <span className="text-[11px] text-slate-400 font-medium">kg</span>
              </div>

              {/* Input: Reps Achieved */}
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  placeholder="reps"
                  value={set.loggedReps !== undefined ? set.loggedReps : ""}
                  onChange={(e) =>
                    handleUpdateReps(
                      idx,
                      e.target.value ? parseInt(e.target.value, 10) : undefined
                    )
                  }
                  className="w-14 sm:w-16 px-2 py-1.5 text-xs bg-[#05100B] border border-[#143021] rounded-lg text-white font-semibold text-center focus:outline-none focus:ring-1 focus:ring-[#00A859]"
                />
                <span className="text-[11px] text-slate-400 font-medium">reps</span>
              </div>

              {/* Checkbox Trigger */}
              <button
                onClick={() => handleToggleSet(idx)}
                className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all active:scale-90 ${
                  set.completed
                    ? "bg-[#00A859] text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/30"
                    : "bg-[#0E2419] text-slate-400 hover:text-white border-[#17452B] hover:border-[#008244]"
                }`}
                title={set.completed ? "Mark incomplete" : "Mark complete"}
              >
                <Check className={`w-4 h-4 ${set.completed ? "stroke-[3] text-slate-950" : ""}`} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
