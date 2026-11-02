import { useState, useEffect } from "react";
import { Timer, X, Play, Pause, RotateCcw, Plus, Minus, Bell } from "lucide-react";
import { soundManager } from "../utils/audio";

interface RestTimerModalProps {
  initialSeconds: number;
  label?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const RestTimerModal = ({
  initialSeconds,
  label = "Rest Interval",
  isOpen,
  onClose,
}: RestTimerModalProps) => {
  const [totalSeconds, setTotalSeconds] = useState<number>(initialSeconds || 90);
  const [timeLeft, setTimeLeft] = useState<number>(initialSeconds || 90);
  const [isRunning, setIsRunning] = useState<boolean>(true);

  useEffect(() => {
    if (isOpen) {
      const s = initialSeconds || 90;
      setTotalSeconds(s);
      setTimeLeft(s);
      setIsRunning(true);
    }
  }, [isOpen, initialSeconds]);

  useEffect(() => {
    if (!isOpen || !isRunning) return;

    if (timeLeft <= 0) {
      soundManager.playChime();
      setIsRunning(false);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          soundManager.playChime();
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, isRunning, timeLeft]);

  if (!isOpen) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  const progressPercent = totalSeconds > 0 ? (timeLeft / totalSeconds) * 100 : 0;

  const handleAdjust = (delta: number) => {
    setTimeLeft((prev) => Math.max(0, prev + delta));
    setTotalSeconds((prev) => Math.max(1, prev + delta));
  };

  const setPreset = (s: number) => {
    setTotalSeconds(s);
    setTimeLeft(s);
    setIsRunning(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-sm p-6 shadow-2xl relative text-center">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/80 hover:bg-slate-750 transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center justify-center gap-2 mb-1">
          <Timer className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Executive Recovery Timer
          </span>
        </div>
        <h3 className="text-sm font-semibold text-slate-200 truncate px-6 mb-4">
          {label}
        </h3>

        {/* Circular Display */}
        <div className="relative w-44 h-44 mx-auto flex items-center justify-center mb-6">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            {/* Background Circle */}
            <circle
              cx="50"
              cy="50"
              r="44"
              className="stroke-slate-800"
              strokeWidth="6"
              fill="transparent"
            />
            {/* Progress Circle */}
            <circle
              cx="50"
              cy="50"
              r="44"
              className="stroke-amber-400 transition-all duration-1000 ease-linear"
              strokeWidth="6"
              strokeDasharray="276.46"
              strokeDashoffset={276.46 * (1 - progressPercent / 100)}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>

          {/* Time Left Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-extrabold text-white font-mono tracking-tight">
              {formattedTime}
            </span>
            <span className="text-[11px] font-medium text-slate-400 mt-1 flex items-center gap-1">
              {timeLeft === 0 ? (
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <Bell className="w-3 h-3 animate-bounce" /> Time to Lift!
                </span>
              ) : isRunning ? (
                "Recovering..."
              ) : (
                "Paused"
              )}
            </span>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-center gap-3 mb-5">
          <button
            onClick={() => handleAdjust(-15)}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 active:scale-95 transition"
            title="Minus 15s"
          >
            <Minus className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg transition active:scale-95 ${
              isRunning
                ? "bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20"
                : "bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20"
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4 fill-current" /> Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" /> Resume
              </>
            )}
          </button>

          <button
            onClick={() => handleAdjust(15)}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 active:scale-95 transition"
            title="Plus 15s"
          >
            <Plus className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              setTimeLeft(totalSeconds);
              setIsRunning(true);
            }}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 active:scale-95 transition"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Presets */}
        <div className="flex items-center justify-center gap-1.5 flex-wrap">
          {[45, 60, 75, 90, 120].map((sec) => (
            <button
              key={sec}
              onClick={() => setPreset(sec)}
              className={`px-2.5 py-1 text-xs rounded-lg font-mono border transition ${
                totalSeconds === sec && timeLeft > 0
                  ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                  : "bg-slate-800/80 hover:bg-slate-750 text-slate-400 border-slate-700"
              }`}
            >
              {sec}s
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
