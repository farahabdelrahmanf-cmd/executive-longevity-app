import { useState } from "react";
import {
  CalendarClock,
  X,
  Sun,
  Moon,
  Clock,
  Check
} from "lucide-react";
import type { ScheduleConfig } from "../types";
import {
  DEFAULT_SCHEDULE_CONFIG,
  generateExecutiveTimeline,
} from "../utils/scheduleCalculator";

interface SchedulePlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: ScheduleConfig;
  onSaveConfig: (updated: ScheduleConfig) => void;
}

export const SchedulePlannerModal = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
}: SchedulePlannerModalProps) => {
  const [localConfig, setLocalConfig] = useState<ScheduleConfig>(config || DEFAULT_SCHEDULE_CONFIG);

  if (!isOpen) return null;

  const handleModeChange = (mode: "am" | "pm") => {
    setLocalConfig((prev) => ({ ...prev, mode }));
  };

  const handleSave = () => {
    onSaveConfig(localConfig);
    onClose();
  };

  const previewTimeline = generateExecutiveTimeline(localConfig, "workday");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="bg-[#091710] border border-[#143021] rounded-3xl w-full max-w-2xl p-5 sm:p-7 shadow-2xl relative my-6 text-left">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-[#05110B] hover:bg-[#0D2418] transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 mb-1">
          <CalendarClock className="w-5 h-5 text-[#00A859]" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#00A859]">
            Executive Schedule Calculator
          </span>
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">
          Customize Abdelrahman's Gym & Work Timing
        </h2>
        <p className="text-xs text-slate-300 mt-0.5">
          Choose AM or PM, customize your timings, and the app calculates every milestone from wake-up to bedtime.
        </p>

        {/* AM vs PM Big Switcher */}
        <div className="grid grid-cols-2 gap-3 my-4">
          <button
            onClick={() => handleModeChange("am")}
            className={`p-3.5 rounded-2xl border transition-all text-left flex items-start gap-3 ${
              localConfig.mode === "am"
                ? "bg-[#006937]/30 border-[#00A859] ring-2 ring-[#00A859]/40 shadow-lg shadow-emerald-950/40"
                : "bg-[#06120B] border-[#143021] text-slate-400 hover:text-slate-200"
            }`}
          >
            <div className={`p-2 rounded-xl shrink-0 ${localConfig.mode === "am" ? "bg-[#00A859] text-slate-950" : "bg-[#0D2418] text-amber-400"}`}>
              <Sun className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-amber-300">
                Option 1: AM Morning Express
              </div>
              <div className="text-sm font-extrabold text-white mt-0.5">
                Gym at 6:00 AM Sharp
              </div>
              <div className="text-[11px] text-slate-300 mt-1 leading-snug">
                Gym opens at 6:00 AM. Workout done before work; evenings 100% free.
              </div>
            </div>
          </button>

          <button
            onClick={() => handleModeChange("pm")}
            className={`p-3.5 rounded-2xl border transition-all text-left flex items-start gap-3 ${
              localConfig.mode === "pm"
                ? "bg-[#006937]/30 border-[#00A859] ring-2 ring-[#00A859]/40 shadow-lg shadow-emerald-950/40"
                : "bg-[#06120B] border-[#143021] text-slate-400 hover:text-slate-200"
            }`}
          >
            <div className={`p-2 rounded-xl shrink-0 ${localConfig.mode === "pm" ? "bg-[#00A859] text-slate-950" : "bg-[#0D2418] text-indigo-400"}`}>
              <Moon className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                Option 2: PM Post-Work
              </div>
              <div className="text-sm font-extrabold text-white mt-0.5">
                Straight from Saudi Technic (7:15 PM)
              </div>
              <div className="text-[11px] text-slate-300 mt-1 leading-snug">
                Wash off 11.5h boardroom stress; sauna and sleep like a baby.
              </div>
            </div>
          </button>
        </div>

        {/* Customizable Timing Inputs */}
        <div className="p-4 rounded-2xl bg-[#06120B] border border-[#143021] space-y-3.5 mb-4">
          <div className="flex items-center justify-between text-xs font-bold text-slate-300 uppercase tracking-wider">
            <span>Adjust Timings & Durations:</span>
            <span className="text-[#00A859] font-normal text-[11px]">Auto-calculates schedule</span>
          </div>

          {localConfig.mode === "am" ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Gym Arrival Time
                </label>
                <input
                  type="time"
                  value={localConfig.amGymArrival}
                  onChange={(e) =>
                    setLocalConfig((prev) => ({ ...prev, amGymArrival: e.target.value }))
                  }
                  className="w-full px-2.5 py-1.5 text-xs bg-[#091710] border border-[#143021] rounded-xl text-white font-semibold focus:outline-none focus:ring-1 focus:ring-[#00A859]"
                />
                <span className="text-[10px] text-emerald-400 mt-0.5 block">Fitness Time+ opens 6:00 AM</span>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Workout Time
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    min="25"
                    max="60"
                    value={localConfig.amWorkoutMinutes}
                    onChange={(e) =>
                      setLocalConfig((prev) => ({ ...prev, amWorkoutMinutes: parseInt(e.target.value, 10) || 40 }))
                    }
                    className="w-full px-2.5 py-1.5 text-xs bg-[#091710] border border-[#143021] rounded-xl text-white font-semibold focus:outline-none focus:ring-1 focus:ring-[#00A859]"
                  />
                  <span className="text-[11px] text-slate-400">min</span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Sauna & Shower
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    min="15"
                    max="45"
                    value={localConfig.amSaunaMinutes + localConfig.amGroomingMinutes}
                    onChange={(e) => {
                      const total = parseInt(e.target.value, 10) || 30;
                      setLocalConfig((prev) => ({
                        ...prev,
                        amSaunaMinutes: Math.round(total / 2),
                        amGroomingMinutes: Math.round(total / 2),
                      }));
                    }}
                    className="w-full px-2.5 py-1.5 text-xs bg-[#091710] border border-[#143021] rounded-xl text-white font-semibold focus:outline-none focus:ring-1 focus:ring-[#00A859]"
                  />
                  <span className="text-[11px] text-slate-400">min</span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Commute to Work
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    min="10"
                    max="45"
                    value={localConfig.amCommuteToWorkMinutes}
                    onChange={(e) =>
                      setLocalConfig((prev) => ({ ...prev, amCommuteToWorkMinutes: parseInt(e.target.value, 10) || 20 }))
                    }
                    className="w-full px-2.5 py-1.5 text-xs bg-[#091710] border border-[#143021] rounded-xl text-white font-semibold focus:outline-none focus:ring-1 focus:ring-[#00A859]"
                  />
                  <span className="text-[11px] text-slate-400">min</span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Target Sleep
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    step="0.5"
                    min="6"
                    max="9"
                    value={localConfig.sleepTargetHours}
                    onChange={(e) =>
                      setLocalConfig((prev) => ({ ...prev, sleepTargetHours: parseFloat(e.target.value) || 7.5 }))
                    }
                    className="w-full px-2.5 py-1.5 text-xs bg-[#091710] border border-[#143021] rounded-xl text-white font-semibold focus:outline-none focus:ring-1 focus:ring-[#00A859]"
                  />
                  <span className="text-[11px] text-slate-400">hrs</span>
                </div>
              </div>
            </div>
          ) : (
            /* PM Mode inputs */
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Work Exit Time
                </label>
                <input
                  type="time"
                  value={localConfig.pmWorkEnd}
                  onChange={(e) =>
                    setLocalConfig((prev) => ({ ...prev, pmWorkEnd: e.target.value }))
                  }
                  className="w-full px-2.5 py-1.5 text-xs bg-[#091710] border border-[#143021] rounded-xl text-white font-semibold focus:outline-none focus:ring-1 focus:ring-[#00A859]"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">Leaves Saudi Technic</span>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Commute to Gym
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    min="5"
                    max="45"
                    value={localConfig.pmCommuteToGymMinutes}
                    onChange={(e) =>
                      setLocalConfig((prev) => ({ ...prev, pmCommuteToGymMinutes: parseInt(e.target.value, 10) || 15 }))
                    }
                    className="w-full px-2.5 py-1.5 text-xs bg-[#091710] border border-[#143021] rounded-xl text-white font-semibold focus:outline-none focus:ring-1 focus:ring-[#00A859]"
                  />
                  <span className="text-[11px] text-slate-400">min</span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Workout Time
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    min="25"
                    max="60"
                    value={localConfig.pmWorkoutMinutes}
                    onChange={(e) =>
                      setLocalConfig((prev) => ({ ...prev, pmWorkoutMinutes: parseInt(e.target.value, 10) || 42 }))
                    }
                    className="w-full px-2.5 py-1.5 text-xs bg-[#091710] border border-[#143021] rounded-xl text-white font-semibold focus:outline-none focus:ring-1 focus:ring-[#00A859]"
                  />
                  <span className="text-[11px] text-slate-400">min</span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Sauna & Jacuzzi
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    min="10"
                    max="30"
                    value={localConfig.pmSaunaMinutes}
                    onChange={(e) =>
                      setLocalConfig((prev) => ({ ...prev, pmSaunaMinutes: parseInt(e.target.value, 10) || 15 }))
                    }
                    className="w-full px-2.5 py-1.5 text-xs bg-[#091710] border border-[#143021] rounded-xl text-white font-semibold focus:outline-none focus:ring-1 focus:ring-[#00A859]"
                  />
                  <span className="text-[11px] text-slate-400">min</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Live Calculated Timeline Preview */}
        <div className="space-y-2 mb-4">
          <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#00A859]" />
            <span>Calculated Executive Daily Flow:</span>
          </div>

          <div className="max-h-56 overflow-y-auto space-y-1.5 pr-1">
            {previewTimeline.map((item, idx) => (
              <div
                key={idx}
                className={`p-2.5 rounded-xl border flex items-start justify-between gap-3 text-xs transition ${
                  item.highlight
                    ? "bg-[#006937]/25 border-[#00A859]/50 text-white"
                    : "bg-[#06120B] border-[#143021] text-slate-300"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-amber-300 min-w-[70px]">
                    {item.time}
                  </span>
                  <div>
                    <strong className="text-white block">{item.title}</strong>
                    <span className="text-[11px] text-slate-400">{item.desc}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-2 border-t border-[#143021] flex items-center justify-between gap-3">
          <button
            onClick={() => setLocalConfig(DEFAULT_SCHEDULE_CONFIG)}
            className="text-xs text-slate-400 hover:text-slate-200 transition"
          >
            Reset to Standard 6:00 AM
          </button>

          <button
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#00A859] hover:bg-emerald-400 text-slate-950 flex items-center gap-1.5 shadow-lg shadow-emerald-500/30 active:scale-95 transition"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>Apply Custom Schedule</span>
          </button>
        </div>

      </div>
    </div>
  );
};
