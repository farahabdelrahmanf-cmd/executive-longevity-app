import { CheckCircle2, Briefcase, Coffee, Calendar } from "lucide-react";
import type { DayOfWeek, DayRoutine } from "../types";

interface DaySelectorProps {
  routines: DayRoutine[];
  activeDay: DayOfWeek;
  onSelectDay: (day: DayOfWeek) => void;
  completedDays: string[];
}

export const DaySelector = ({
  routines,
  activeDay,
  onSelectDay,
  completedDays,
}: DaySelectorProps) => {
  const todayIndex = new Date().getDay();
  const daysMap: DayOfWeek[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  const currentSaudiDay = daysMap[todayIndex];

  return (
    <div className="bg-[#091710] border border-[#143021] rounded-2xl p-2.5 sm:p-3 shadow-xl">
      <div className="flex items-center justify-between px-2 mb-2">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
          <Calendar className="w-3.5 h-3.5 text-[#00A859]" />
          <span>Weekly Schedule • Saudi Technic Workweek</span>
        </div>
        <div className="text-xs text-slate-400">
          Sun–Thu Workday | Fri–Sat Weekend
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
        {routines.map((routine) => {
          const isSelected = routine.day === activeDay;
          const isToday = routine.day === currentSaudiDay;
          const isCompleted = completedDays.includes(routine.day);

          return (
            <button
              key={routine.day}
              onClick={() => onSelectDay(routine.day)}
              className={`relative flex flex-col items-center justify-between p-2 sm:p-2.5 rounded-xl border transition-all text-center min-h-[76px] sm:min-h-[86px] select-none ${
                isSelected
                  ? "bg-gradient-to-b from-[#006937]/50 via-[#0A2015] to-[#06140C] border-[#00A859] shadow-lg shadow-emerald-950/40 ring-1 ring-[#00A859]/50"
                  : "bg-[#06120B] hover:bg-[#0C2217] border-[#143021] text-slate-400 hover:text-slate-200"
              }`}
            >
              {/* Top Tag: Today or Completed */}
              <div className="flex items-center justify-center w-full min-h-[16px]">
                {isCompleted ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                ) : isToday ? (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded-full bg-[#00A859] text-slate-950">
                    Today
                  </span>
                ) : (
                  <span className="text-[10px] text-slate-500 font-medium">
                    {routine.dayType === "workday" ? (
                      <Briefcase className="w-3 h-3 inline-block opacity-40 text-slate-400" />
                    ) : (
                      <Coffee className="w-3 h-3 inline-block opacity-40 text-amber-400" />
                    )}
                  </span>
                )}
              </div>

              {/* Day Name */}
              <div className="my-0.5">
                <span
                  className={`block text-xs sm:text-sm font-bold tracking-tight ${
                    isSelected ? "text-white" : "text-slate-300"
                  }`}
                >
                  {routine.shortDay}
                </span>
              </div>

              {/* Focus / Duration Snippet */}
              <div className="w-full">
                <span
                  className={`block text-[10px] sm:text-[11px] truncate leading-tight font-medium ${
                    isSelected ? "text-[#00A859] font-bold" : "text-slate-400"
                  }`}
                  title={routine.focus}
                >
                  {routine.estimatedMinutes}m
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
