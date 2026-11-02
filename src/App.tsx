import { useState, useEffect } from "react";
import {
  Header
} from "./components/Header";
import {
  DaySelector
} from "./components/DaySelector";
import {
  ExecutiveSummaryBar
} from "./components/ExecutiveSummaryBar";
import {
  ExerciseCard
} from "./components/ExerciseCard";
import {
  RestTimerModal
} from "./components/RestTimerModal";
import {
  BreathingGuideModal
} from "./components/BreathingGuideModal";
import {
  RecoveryGuideModal
} from "./components/RecoveryGuideModal";
import {
  InBodyTrackerModal
} from "./components/InBodyTrackerModal";
import {
  ProtocolsModal
} from "./components/ProtocolsModal";
import {
  SettingsModal
} from "./components/SettingsModal";
import {
  SchedulePlannerModal
} from "./components/SchedulePlannerModal";
import {
  ExecutiveTimelineCard
} from "./components/ExecutiveTimelineCard";
import {
  MotivationGallery
} from "./components/MotivationGallery";

import { WEEKLY_ROUTINE } from "./data/workoutPlan";
import type { DayOfWeek, DayRoutine, UserPreferences, InBodyRecord, ScheduleConfig } from "./types";
import {
  getPreferences,
  savePreferences,
  getCompletedDays,
  toggleDayCompleted,
  getInBodyRecords,
} from "./utils/storage";

import {
  Flame,
  Sun,
  Moon,
  CheckCircle2,
  Dumbbell,
  X,
  Download,
} from "lucide-react";

export function App() {
  // Determine initial day based on local day of week (Sunday is 0)
  const daysList: DayOfWeek[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  const todayDay = daysList[new Date().getDay()];

  const [activeDay, setActiveDay] = useState<DayOfWeek>(todayDay);
  const [preferences, setPreferences] = useState<UserPreferences>(getPreferences);
  const [completedDays, setCompletedDays] = useState<string[]>(getCompletedDays);
  const [inbodyRecords, setInbodyRecords] = useState<InBodyRecord[]>(getInBodyRecords);

  // Modals state
  const [timerModal, setTimerModal] = useState<{
    isOpen: boolean;
    seconds: number;
    label: string;
  }>({
    isOpen: false,
    seconds: 90,
    label: "Rest Interval",
  });

  const [isBreathingOpen, setIsBreathingOpen] = useState<boolean>(false);
  const [isRecoveryOpen, setIsRecoveryOpen] = useState<boolean>(false);
  const [isInBodyOpen, setIsInBodyOpen] = useState<boolean>(false);
  const [isProtocolsOpen, setIsProtocolsOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isSchedulePlannerOpen, setIsSchedulePlannerOpen] = useState<boolean>(false);

  const currentRoutine: DayRoutine =
    WEEKLY_ROUTINE.find((r) => r.day === activeDay) || WEEKLY_ROUTINE[0];

  const isTodayCompleted = completedDays.includes(currentRoutine.day);

  const handleToggleComplete = () => {
    toggleDayCompleted(currentRoutine.day);
    setCompletedDays(getCompletedDays());
  };

  const handleOpenTimer = (seconds: number, label: string) => {
    setTimerModal({
      isOpen: true,
      seconds,
      label,
    });
  };

  const handleCloseTimer = () => {
    setTimerModal((prev) => ({ ...prev, isOpen: false }));
  };

  // Android & Samsung Galaxy PWA Install Prompt state
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallBannerVisible, setIsInstallBannerVisible] = useState(true);

  useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
  }, []);

  const handleInstallApp = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setDeferredPrompt(null);
    }
  };

  // Android hardware back button / swipe-back gesture handling
  const isAnyModalOpen =
    timerModal.isOpen ||
    isBreathingOpen ||
    isRecoveryOpen ||
    isInBodyOpen ||
    isProtocolsOpen ||
    isSettingsOpen ||
    isSchedulePlannerOpen;

  useEffect(() => {
    if (isAnyModalOpen) {
      window.history.pushState({ modal: true }, "");
      const handlePop = () => {
        setTimerModal((prev) => ({ ...prev, isOpen: false }));
        setIsBreathingOpen(false);
        setIsRecoveryOpen(false);
        setIsInBodyOpen(false);
        setIsProtocolsOpen(false);
        setIsSettingsOpen(false);
        setIsSchedulePlannerOpen(false);
      };
      window.addEventListener("popstate", handlePop);
      return () => {
        window.removeEventListener("popstate", handlePop);
      };
    }
  }, [isAnyModalOpen]);

  // Calculate total cardio minutes logged across completed days
  const totalCardio = completedDays.reduce((acc, dayName) => {
    const r = WEEKLY_ROUTINE.find((item) => item.day === dayName);
    return acc + (r ? r.cardioMinutes : 0);
  }, 0);

  return (
    <div className="min-h-screen bg-[#050E09] text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* Samsung Galaxy & Android 1-Tap Install Notification Bar */}
      {deferredPrompt && isInstallBannerVisible && (
        <div className="bg-gradient-to-r from-emerald-950 via-[#006937] to-emerald-950 border-b border-amber-400/30 px-4 py-2.5 text-xs flex items-center justify-between text-white shadow-xl sticky top-0 z-40">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-white/10 p-1 flex items-center justify-center shrink-0">
              <Download className="w-3.5 h-3.5 text-amber-300" />
            </div>
            <span className="leading-tight text-slate-100">
              <strong className="text-amber-300">Samsung Galaxy App:</strong> Install Longevity OS to your home screen for quick gym access.
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleInstallApp}
              className="px-3 py-1 rounded-lg bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-bold transition text-xs shadow-md"
            >
              Install
            </button>
            <button
              onClick={() => setIsInstallBannerVisible(false)}
              className="p-1 rounded-lg text-emerald-200 hover:text-white transition"
              aria-label="Dismiss banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Sticky Executive Header */}
      <Header
        preferences={preferences}
        onUpdatePreferences={(updated) => {
          const neu = { ...preferences, ...updated };
          setPreferences(neu);
          savePreferences(neu);
        }}
        onOpenBreathing={() => setIsBreathingOpen(true)}
        onOpenRecovery={() => setIsRecoveryOpen(true)}
        onOpenInBody={() => setIsInBodyOpen(true)}
        onOpenProtocols={() => setIsProtocolsOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenSchedulePlanner={() => setIsSchedulePlannerOpen(true)}
      />

      {/* Main App Container */}
      <main className="max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6 flex-1">
        
        {/* 'Who I Do It For' - Executive Family Motivation & Daily Purpose */}
        <MotivationGallery />

        {/* 7-Day Saudi Corporate Calendar Strip */}
        <DaySelector
          routines={WEEKLY_ROUTINE}
          activeDay={activeDay}
          onSelectDay={(day: DayOfWeek) => setActiveDay(day)}
          completedDays={completedDays}
        />

        {/* Executive Summary Bar & Daily Objective */}
        <ExecutiveSummaryBar
          currentRoutine={currentRoutine}
          isCompleted={isTodayCompleted}
          onToggleComplete={handleToggleComplete}
          completedDays={completedDays}
          totalCardioMinutes={totalCardio}
        />

        {/* Executive Timeline & Schedule Calculator Widget */}
        <ExecutiveTimelineCard
          config={preferences.scheduleConfig}
          currentRoutine={currentRoutine}
          onOpenPlanner={() => setIsSchedulePlannerOpen(true)}
          onToggleMode={() => {
            const nextMode = preferences.scheduleConfig?.mode === "am" ? "pm" : "am";
            const nextSlot = nextMode === "am" ? "morning" : "evening";
            const updated: UserPreferences = {
              ...preferences,
              preferredSlot: nextSlot,
              scheduleConfig: {
                ...preferences.scheduleConfig,
                mode: nextMode,
              },
            };
            setPreferences(updated);
            savePreferences(updated);
          }}
        />

        {/* Dynamic Circadian Advice Banner (Morning vs Evening) */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900/60 border border-slate-800 text-xs shadow-lg flex items-start gap-3">
          {preferences.preferredSlot === "morning" ? (
            <>
              <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0">
                <Sun className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <div className="font-bold text-amber-300 flex items-center gap-1.5">
                  <span>Morning Express Protocol (6:00 AM – 6:45 AM)</span>
                  <span className="text-[10px] px-2 py-0.2 rounded-full bg-amber-500/20 text-amber-200">
                    Circadian Peak
                  </span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Hydrate with 500ml water + pinch of salt before heading to Fitness Time+. Channels the natural cortisol awakening response into resistance training. Leaves your evening 100% free for family and uninterrupted rest.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 shrink-0">
                <Moon className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <div className="font-bold text-indigo-300 flex items-center gap-1.5">
                  <span>Post-Work Decompression Protocol (7:15 PM – 8:00 PM)</span>
                  <span className="text-[10px] px-2 py-0.2 rounded-full bg-indigo-500/20 text-indigo-200">
                    Stress Discharge
                  </span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Drive directly from Saudi Technic to Fitness Time+ • Jeddah. Treat this 42-minute session as your physical decompression boundary: sweat off boardroom tension, complete the exercises, follow with 12m dry sauna, and arrive home mentally clear.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Exercises Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Dumbbell className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
                Prescribed Longevity Exercises ({currentRoutine.exercises.length} Movements)
              </h3>
            </div>
            <span className="text-xs text-slate-500 font-medium">
              Fitness Time+ Technogym Floor
            </span>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {currentRoutine.exercises.map((exercise) => (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
                onOpenTimer={handleOpenTimer}
              />
            ))}
          </div>
        </div>

        {/* Post-Routine Thermal Recovery Card */}
        <div className="bg-gradient-to-br from-amber-950/20 via-slate-900 to-slate-900/90 border border-amber-500/30 rounded-3xl p-5 sm:p-6 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5" />
                  <span>Thermal Recovery Finale</span>
                </span>
                <span className="text-xs text-slate-400">
                  {currentRoutine.recovery.durationMinutes} Minutes
                </span>
                {currentRoutine.recovery.temperature && (
                  <span className="text-xs font-mono text-amber-400">
                    ({currentRoutine.recovery.temperature})
                  </span>
                )}
              </div>

              <h3 className="text-lg font-bold text-white tracking-tight">
                {currentRoutine.recovery.title}
              </h3>
              <p className="text-xs text-slate-300 font-medium leading-relaxed max-w-xl">
                Facility: <strong className="text-white">{currentRoutine.recovery.facility}</strong>
              </p>

              {/* Procedure Steps */}
              <div className="space-y-1.5 pt-1">
                {currentRoutine.recovery.procedure.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>

              {/* Science Rationale */}
              <div className="mt-3 p-3 rounded-xl bg-slate-950/60 border border-amber-500/20 text-xs text-slate-300">
                <span className="font-semibold text-amber-300 block mb-0.5">
                  Scientific Mechanism:
                </span>
                <p className="text-slate-400 leading-relaxed">
                  {currentRoutine.recovery.scienceBenefit}
                </p>
              </div>
            </div>

            {/* Quick Trigger Button to open Recovery Hub */}
            <button
              onClick={() => setIsRecoveryOpen(true)}
              className="px-5 py-3 rounded-2xl font-bold text-xs bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center gap-2 shadow-lg shadow-amber-500/20 transition active:scale-95 shrink-0 self-start sm:self-auto"
            >
              <Flame className="w-4 h-4 fill-current" />
              <span>Launch Thermal Timers</span>
            </button>
          </div>
        </div>

      </main>

      {/* Executive Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-6 text-center text-xs text-slate-500 space-y-1">
        <p className="font-semibold tracking-wider text-slate-400">
          APEX EXECUTIVE • Longevity & Recovery OS
        </p>
        <p className="text-[11px] text-slate-500">
          Custom engineered for VP Abdelrahman Farah • Saudia Technic • Fitness Time+ • Jeddah, KSA
        </p>
        <p className="text-[10px] text-slate-600">
          Longevity medicine & circadian science protocols grounded in Peter Attia, MD & Andrew Huberman, PhD frameworks.
        </p>
      </footer>

      {/* Floating Rest Timer Modal */}
      <RestTimerModal
        isOpen={timerModal.isOpen}
        initialSeconds={timerModal.seconds}
        label={timerModal.label}
        onClose={handleCloseTimer}
      />

      {/* Huberman Physiological Sigh Breathing Modal */}
      <BreathingGuideModal
        isOpen={isBreathingOpen}
        onClose={() => setIsBreathingOpen(false)}
      />

      {/* Thermal & Wet Hub Modal */}
      <RecoveryGuideModal
        isOpen={isRecoveryOpen}
        onClose={() => setIsRecoveryOpen(false)}
      />

      {/* InBody Bio-Tracker Modal */}
      <InBodyTrackerModal
        isOpen={isInBodyOpen}
        onClose={() => setIsInBodyOpen(false)}
        records={inbodyRecords}
        onUpdateRecords={(records: InBodyRecord[]) => setInbodyRecords(records)}
      />

      {/* Science Protocols Modal */}
      <ProtocolsModal
        isOpen={isProtocolsOpen}
        onClose={() => setIsProtocolsOpen(false)}
      />

      {/* Schedule Customizer & Calculator Modal */}
      <SchedulePlannerModal
        isOpen={isSchedulePlannerOpen}
        onClose={() => setIsSchedulePlannerOpen(false)}
        config={preferences.scheduleConfig}
        onSaveConfig={(updatedConfig: ScheduleConfig) => {
          const nextSlot = updatedConfig.mode === "am" ? "morning" : "evening";
          const updated: UserPreferences = {
            ...preferences,
            preferredSlot: nextSlot,
            scheduleConfig: updatedConfig,
          };
          setPreferences(updated);
          savePreferences(updated);
        }}
      />

      {/* Preferences / Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        preferences={preferences}
        onSavePreferences={(prefs: UserPreferences) => setPreferences(prefs)}
      />

    </div>
  );
}

export default App;
