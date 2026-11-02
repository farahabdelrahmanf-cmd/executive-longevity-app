import { useState, useEffect } from "react";
import { Wind, X, Play, RotateCcw, ShieldCheck, HeartPulse } from "lucide-react";
import { soundManager } from "../utils/audio";

interface BreathingGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type BreathPhase = "idle" | "inhale1" | "inhale2" | "exhale";

export const BreathingGuideModal = ({
  isOpen,
  onClose,
}: BreathingGuideModalProps) => {
  const [phase, setPhase] = useState<BreathPhase>("idle");
  const [cycleCount, setCycleCount] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) {
      setIsActive(false);
      setPhase("idle");
      setCycleCount(0);
      return;
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !isActive) return;

    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "idle" || phase === "exhale") {
      // Transition to Inhale 1 (2.5 seconds)
      timeout = setTimeout(() => {
        setPhase("inhale1");
      }, phase === "idle" ? 200 : 500);
    } else if (phase === "inhale1") {
      // Inhale 1 lasts 2.5 seconds, then quick top-up inhale 2 (1.2 seconds)
      timeout = setTimeout(() => {
        soundManager.playDoubleBeep();
        setPhase("inhale2");
      }, 2500);
    } else if (phase === "inhale2") {
      // Inhale 2 lasts 1.2s, then long exhale (5.5 seconds)
      timeout = setTimeout(() => {
        setPhase("exhale");
        setCycleCount((c) => c + 1);
      }, 1200);
    }

    return () => clearTimeout(timeout);
  }, [isOpen, isActive, phase]);

  if (!isOpen) return null;

  const getPhaseInstruction = () => {
    switch (phase) {
      case "inhale1":
        return {
          title: "Deep Inhale (Nose)",
          subtitle: "Fill 80% of your lungs through the nose",
          scale: "scale-125 bg-emerald-500/30 border-emerald-400",
          textColor: "text-emerald-300",
        };
      case "inhale2":
        return {
          title: "Top-Up Inhale!",
          subtitle: "One more sharp sip of air to pop open alveoli",
          scale: "scale-140 bg-cyan-500/35 border-cyan-300 ring-4 ring-cyan-500/30",
          textColor: "text-cyan-200",
        };
      case "exhale":
        return {
          title: "Long, Slow Exhale (Mouth)",
          subtitle: "Pursed lips... slow sigh all the way to empty",
          scale: "scale-90 bg-slate-800/80 border-slate-700",
          textColor: "text-indigo-300",
        };
      default:
        return {
          title: "Press Start to Begin",
          subtitle: "2-minute real-time executive nervous system reset",
          scale: "scale-100 bg-slate-800/60 border-slate-700",
          textColor: "text-slate-300",
        };
    }
  };

  const currentInfo = getPhaseInstruction();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-md p-6 sm:p-7 shadow-2xl relative text-center">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/80 hover:bg-slate-750 transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center justify-center gap-2 mb-1">
          <Wind className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Huberman Protocol
          </span>
        </div>
        <h2 className="text-lg font-bold text-white tracking-tight">
          The Physiological Sigh
        </h2>
        <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
          Stanford neurobiology protocol: The fastest real-time tool to drop autonomic stress & cortisol.
        </p>

        {/* Dynamic Breathing Bubble */}
        <div className="py-10 flex items-center justify-center relative min-h-[260px]">
          <div
            className={`w-44 h-44 rounded-full border-2 flex flex-col items-center justify-center transition-all duration-1000 ease-in-out shadow-2xl ${currentInfo.scale}`}
          >
            <span className={`text-sm sm:text-base font-bold transition-colors ${currentInfo.textColor}`}>
              {currentInfo.title}
            </span>
            <span className="text-[11px] text-slate-300 px-4 mt-1 font-medium leading-snug">
              {currentInfo.subtitle}
            </span>
          </div>
        </div>

        {/* Cycles counter */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
            <HeartPulse className="w-4 h-4 text-rose-400" />
            <span>Completed Cycles: <strong className="text-white">{cycleCount}</strong></span>
          </div>
          <span className="text-xs text-slate-500">Goal: 6 - 10 cycles</span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-center gap-3 mb-5">
          <button
            onClick={() => {
              if (!isActive) {
                setIsActive(true);
                setPhase("inhale1");
              } else {
                setIsActive(false);
                setPhase("idle");
              }
            }}
            className={`px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg transition active:scale-95 ${
              isActive
                ? "bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20"
                : "bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20"
            }`}
          >
            {isActive ? "Pause Breathing" : <><Play className="w-4 h-4 fill-current" /> Begin 2-Min Reset</>}
          </button>

          <button
            onClick={() => {
              setIsActive(false);
              setPhase("idle");
              setCycleCount(0);
            }}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700 active:scale-95 transition"
            title="Reset Counter"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Science Footer Brief */}
        <div className="text-left p-3 rounded-xl bg-slate-800/50 border border-slate-700/60 text-[11px] text-slate-300 space-y-1">
          <div className="flex items-center gap-1.5 font-semibold text-amber-300">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Why This Works in Real-Time:</span>
          </div>
          <p className="text-slate-400 leading-relaxed">
            The second sip of air pops open collapsed alveoli in the lungs, dramatically increasing surface area. The long exhale slows the heart rate via the phrenic and vagal nerve pathways.
          </p>
        </div>

      </div>
    </div>
  );
};
