import { useState } from "react";
import {
  Clock,
  Sun,
  Moon,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  Briefcase,
  Dumbbell,
  Bed,
} from "lucide-react";
import type { ScheduleConfig, DayRoutine } from "../types";
import { generateExecutiveTimeline, format12Hour } from "../utils/scheduleCalculator";

interface ExecutiveTimelineCardProps {
  config: ScheduleConfig;
  currentRoutine: DayRoutine;
  onOpenPlanner: () => void;
  onToggleMode: () => void;
}

export const ExecutiveTimelineCard = ({
  config,
  currentRoutine,
  onOpenPlanner,
  onToggleMode,
}: ExecutiveTimelineCardProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const timeline = generateExecutiveTimeline(config, currentRoutine.dayType);

  const isAM = config.mode === "am";

  return (
    <div className="bg-[#091710] border border-[#143021] rounded-3xl p-4 sm:p-5 shadow-2xl relative overflow-hidden">
      
      {/* Top Banner: Mode & Quick Switch */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-[#006937]/30 border border-[#00A859]/30 text-[#00A859] shrink-0">
            {isAM ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-400" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#00A859]">
                {isAM ? "Morning Express (AM)" : "Post-Work Decompress (PM)"}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-medium">
                {currentRoutine.dayType === "workday" ? "Workday Routine" : "Weekend Routine"}
              </span>
            </div>
            <h3 className="text-base font-extrabold text-white tracking-tight mt-0.5">
              {isAM
                ? "Gym at 6:00 AM Sharp • Saudi Technic at 7:35 AM"
                : "Work until 7:00 PM • Fitness Time+ at 7:15 PM"}
            </h3>
          </div>
        </div>

        {/* Action Buttons: AM/PM Switch & Customize Times */}
        <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
          <button
            onClick={onToggleMode}
            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-[#06120B] hover:bg-[#0D2418] text-slate-200 border border-[#143021] transition active:scale-95 flex items-center gap-1.5"
            title="Toggle between AM and PM routines"
          >
            {isAM ? (
              <>
                <Moon className="w-3.5 h-3.5 text-indigo-400" />
                <span>Switch to PM</span>
              </>
            ) : (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span>Switch to AM</span>
              </>
            )}
          </button>

          <button
            onClick={onOpenPlanner}
            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-[#006937] hover:bg-[#008244] text-white border border-[#00A859]/40 transition active:scale-95 flex items-center gap-1.5 shadow-md shadow-emerald-950/40"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-300" />
            <span>Customize Times</span>
          </button>
        </div>
      </div>

      {/* 3 Key Calculated Milestones */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 my-3.5">
        <div className="p-2.5 rounded-2xl bg-[#06120B] border border-[#143021] text-center">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-center gap-1">
            <Dumbbell className="w-3 h-3 text-[#00A859]" />
            <span>Gym Arrival</span>
          </div>
          <div className="text-sm sm:text-base font-extrabold text-white font-mono mt-0.5">
            {isAM ? format12Hour(config.amGymArrival || "06:00") : "7:15 PM"}
          </div>
          <div className="text-[10px] text-emerald-400 truncate mt-0.5">
            {isAM ? "Doors open sharp" : "Decompress"}
          </div>
        </div>

        <div className="p-2.5 rounded-2xl bg-[#06120B] border border-[#143021] text-center">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-center gap-1">
            <Briefcase className="w-3 h-3 text-cyan-400" />
            <span>Saudi Technic</span>
          </div>
          <div className="text-sm sm:text-base font-extrabold text-white font-mono mt-0.5">
            {isAM ? "7:35 AM" : "7:00 PM Exit"}
          </div>
          <div className="text-[10px] text-cyan-300 truncate mt-0.5">
            {isAM ? "Primed & alert" : "Work finished"}
          </div>
        </div>

        <div className="p-2.5 rounded-2xl bg-[#06120B] border border-[#143021] text-center">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-center gap-1">
            <Bed className="w-3 h-3 text-indigo-400" />
            <span>Target Bedtime</span>
          </div>
          <div className="text-sm sm:text-base font-extrabold text-white font-mono mt-0.5">
            {isAM ? "10:15 PM" : "11:00 PM"}
          </div>
          <div className="text-[10px] text-indigo-300 truncate mt-0.5">
            {config.sleepTargetHours || 7.5}h Sleep
          </div>
        </div>
      </div>

      {/* Accordion Toggle for Detailed Timeline */}
      <div className="pt-1">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full py-2 px-3 rounded-xl bg-[#06120B]/70 hover:bg-[#06120B] border border-[#143021] text-xs font-semibold text-slate-300 hover:text-white flex items-center justify-between transition"
        >
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-[#00A859]" />
            <span>{isExpanded ? "Hide Full Day Timeline" : "View Step-by-Step Day Timeline"}</span>
          </div>
          {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {/* Detailed Timeline List (Expanded) */}
        {isExpanded && (
          <div className="mt-3 space-y-2 pt-2 border-t border-[#143021] max-h-72 overflow-y-auto pr-1 animate-fade-in">
            {timeline.map((step, idx) => (
              <div
                key={idx}
                className={`p-2.5 rounded-xl border flex items-start gap-3 text-xs transition ${
                  step.highlight
                    ? "bg-[#006937]/25 border-[#00A859]/50 text-white"
                    : "bg-[#06120B] border-[#143021] text-slate-300"
                }`}
              >
                <span className="font-mono font-bold text-amber-300 min-w-[70px] shrink-0 pt-0.5">
                  {step.time}
                </span>
                <div className="flex-1">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <span>{step.title}</span>
                    {step.highlight && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-[#00A859] text-slate-950 font-extrabold uppercase">
                        Key Milestone
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
