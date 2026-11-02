import { useState, useEffect } from "react";
import { Sun, Moon, Wind, Flame, Activity, BookOpen, Settings } from "lucide-react";
import type { UserPreferences } from "../types";
import { resolveAsset } from "../utils/assets";

interface HeaderProps {
  preferences: UserPreferences;
  onUpdatePreferences: (updated: Partial<UserPreferences>) => void;
  onOpenBreathing: () => void;
  onOpenRecovery: () => void;
  onOpenInBody: () => void;
  onOpenProtocols: () => void;
  onOpenSettings: () => void;
  onOpenSchedulePlanner: () => void;
}

export const Header = ({
  preferences,
  onUpdatePreferences,
  onOpenBreathing,
  onOpenRecovery,
  onOpenInBody,
  onOpenProtocols,
  onOpenSettings,
  onOpenSchedulePlanner,
}: HeaderProps) => {
  const [jeddahTime, setJeddahTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Riyadh",
        weekday: "short",
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      setJeddahTime(formatter.format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const toggleSlot = () => {
    const nextSlot = preferences.preferredSlot === "morning" ? "evening" : "morning";
    const nextMode = nextSlot === "morning" ? "am" : "pm";
    onUpdatePreferences({
      preferredSlot: nextSlot,
      scheduleConfig: {
        ...(preferences.scheduleConfig || {}),
        mode: nextMode,
      } as any,
    });
  };

  return (
    <header className="bg-[#05110B]/95 backdrop-blur-md border-b border-[#143021] sticky top-0 z-30 transition-all">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          {/* Saudi Technic Brand & Greeting */}
          <div className="flex items-center gap-3">
            {/* Official Saudia Technic Emblem Logo */}
            <div className="w-12 h-12 rounded-xl bg-white p-1.5 flex items-center justify-center shadow-lg shadow-emerald-950/40 border border-[#006937]/40 shrink-0">
              <img
                src={resolveAsset("/saudia-technic.svg")}
                alt="Saudia Technic Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold uppercase tracking-wider text-[#00A859]">
                  Saudia Technic
                </span>
                <span className="text-slate-600">•</span>
                <h1 className="text-sm sm:text-base font-extrabold text-white tracking-tight">
                  {preferences.name?.includes("VP") ? preferences.name : `VP ${preferences.name || "Abdelrahman Farah"}`}
                </h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#006937]/30 text-emerald-300 border border-[#00A859]/30">
                  Longevity OS
                </span>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-2 mt-0.5 flex-wrap">
                <span className="text-amber-400/90 font-medium text-[11px]">VP, Marketing & Sales</span>
                <span className="text-slate-600">•</span>
                <span className="text-[#00A859] font-medium">Fitness Time+ • Jeddah</span>
                {jeddahTime && (
                  <>
                    <span className="text-slate-600">•</span>
                    <span className="text-slate-300 font-mono text-[11px]">{jeddahTime}</span>
                  </>
                )}
              </p>
            </div>
          </div>

          {/* Quick Controls: Slot Switch & Modal Triggers */}
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap justify-between sm:justify-end">
            
            {/* Preferred Time Toggle + Planner Trigger */}
            <div className="flex items-center gap-1 bg-[#0A1A12] p-0.5 rounded-xl border border-[#143021]">
              <button
                onClick={toggleSlot}
                title="Click to switch between Morning (AM) and Evening (PM)"
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-200 hover:text-white transition active:scale-95"
              >
                {preferences.preferredSlot === "morning" ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-amber-300 font-extrabold">AM (6:00 AM)</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-indigo-400" />
                    <span className="text-emerald-300 font-extrabold">PM (7:15 PM)</span>
                  </>
                )}
              </button>

              <button
                onClick={onOpenSchedulePlanner}
                title="Customize Abdelrahman's Schedule & Times"
                className="px-2 py-1.5 rounded-lg text-[11px] font-semibold text-[#00A859] hover:bg-[#006937]/30 transition flex items-center gap-1"
              >
                <span>Edit Times</span>
              </button>
            </div>

            {/* Huberman Physiological Sigh Button */}
            <button
              onClick={onOpenBreathing}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-[#006937]/25 hover:bg-[#006937]/40 text-[#00A859] border border-[#006937]/50 transition active:scale-95"
              title="2-minute de-stress breathing"
            >
              <Wind className="w-3.5 h-3.5 text-[#00A859]" />
              <span className="hidden md:inline">De-Stress Breath</span>
              <span className="md:hidden">Breathe</span>
            </button>

            {/* Thermal / Sauna Protocol Button */}
            <button
              onClick={onOpenRecovery}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 transition active:scale-95"
              title="Sauna & Jacuzzi Circuit"
            >
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden md:inline">Sauna & Jacuzzi</span>
              <span className="md:hidden">Sauna</span>
            </button>

            {/* InBody Bio-Tracker */}
            <button
              onClick={onOpenInBody}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 transition active:scale-95"
              title="InBody Scans"
            >
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden md:inline">InBody</span>
            </button>

            {/* Science Protocols Library */}
            <button
              onClick={onOpenProtocols}
              className="p-2 rounded-xl text-slate-300 hover:text-white bg-[#0A1A12] hover:bg-[#10281C] border border-[#143021] transition active:scale-95"
              title="Longevity Science"
            >
              <BookOpen className="w-4 h-4 text-[#00A859]" />
            </button>

            {/* Settings */}
            <button
              onClick={onOpenSettings}
              className="p-2 rounded-xl text-slate-300 hover:text-white bg-[#0A1A12] hover:bg-[#10281C] border border-[#143021] transition active:scale-95"
              title="Settings"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
