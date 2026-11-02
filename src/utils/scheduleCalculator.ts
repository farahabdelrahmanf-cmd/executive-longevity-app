import type { ScheduleConfig, TimelineEvent } from "../types";

export function parseMinutes(time24: string): number {
  const [h, m] = time24.split(":").map(Number);
  return (h || 0) * 60 + (m || 0);
}

export function formatTime24(totalMinutes: number): string {
  // normalize to 0-1439
  const normalized = ((totalMinutes % 1440) + 1440) % 1440;
  const h = Math.floor(normalized / 60);
  const m = normalized % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export function format12Hour(time24: string): string {
  const [hStr, mStr] = time24.split(":");
  let h = parseInt(hStr, 10);
  const m = mStr || "00";
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12;
  if (h === 0) h = 12;
  return `${h}:${m} ${ampm}`;
}

export function addMinutesToTime(time24: string, mins: number): string {
  return formatTime24(parseMinutes(time24) + mins);
}

export function subtractMinutesFromTime(time24: string, mins: number): string {
  return formatTime24(parseMinutes(time24) - mins);
}

export const DEFAULT_SCHEDULE_CONFIG: ScheduleConfig = {
  mode: "am",
  // AM Mode defaults:
  amGymArrival: "06:00", // Gym opens 6:00 AM sharp!
  amWorkoutMinutes: 42,
  amSaunaMinutes: 15,
  amGroomingMinutes: 15,
  amCommuteToWorkMinutes: 20,
  amCommuteToGymMinutes: 20,
  
  // PM Mode defaults:
  pmWorkEnd: "19:00", // Leaves Saudi Technic at 7:00 PM
  pmCommuteToGymMinutes: 15,
  pmWorkoutMinutes: 42,
  pmSaunaMinutes: 15,
  pmShowerMinutes: 15,
  pmCommuteHomeMinutes: 15,

  sleepTargetHours: 7.5,
};

export function generateExecutiveTimeline(
  config: ScheduleConfig,
  dayType: "workday" | "weekend"
): TimelineEvent[] {
  if (dayType === "weekend") {
    return [
      {
        time: "07:30 AM",
        title: "Natural Morning Awakening",
        desc: "Drink 500ml water. Get 15 minutes of direct sunlight into your eyes.",
        iconType: "wake",
      },
      {
        time: "09:30 AM",
        title: "Fitness Time+ Heated Pool & Contrast",
        desc: "25 min zero-gravity pool swim followed by full Finnish sauna & cold contrast circuit.",
        iconType: "gym",
        highlight: true,
      },
      {
        time: "11:30 AM",
        title: "Family Lunch & Decompression",
        desc: "Quality weekend time with family, unhurried and relaxed.",
        iconType: "dinner",
      },
      {
        time: "05:00 PM",
        title: "Jeddah Corniche Stroll",
        desc: "Relaxed 35m walk along the waterfront enjoying the sea breeze.",
        iconType: "commute",
      },
      {
        time: "10:30 PM",
        title: "Deep Sleep Optimization",
        desc: "Cool room (20°C). Sleep window to wake up refreshed for the workweek.",
        iconType: "sleep",
      },
    ];
  }

  // WORKDAY TIMELINE
  if (config.mode === "am") {
    const gymArrival = config.amGymArrival || "06:00";
    const leaveHome = subtractMinutesFromTime(gymArrival, config.amCommuteToGymMinutes || 20);
    const wakeUp = subtractMinutesFromTime(leaveHome, 20);

    const finishWorkout = addMinutesToTime(gymArrival, config.amWorkoutMinutes || 42);
    const finishSauna = addMinutesToTime(finishWorkout, config.amSaunaMinutes || 15);
    const finishGrooming = addMinutesToTime(finishSauna, config.amGroomingMinutes || 15);
    const arriveWork = addMinutesToTime(finishGrooming, config.amCommuteToWorkMinutes || 20);

    const sleepTargetMinutes = Math.round((config.sleepTargetHours || 7.5) * 60);
    const targetBedtime = subtractMinutesFromTime(wakeUp, sleepTargetMinutes);

    return [
      {
        time: format12Hour(wakeUp),
        title: "Wake Up & Hydrate",
        desc: "Drink 500ml room temperature water + pinch of salt/electrolytes to hydrate before training.",
        iconType: "wake",
      },
      {
        time: format12Hour(leaveHome),
        title: "Depart Home for Gym",
        desc: "Commute to Fitness Time+ in Jeddah. Gym doors unlock at 6:00 AM.",
        iconType: "commute",
      },
      {
        time: format12Hour(gymArrival),
        title: "Fitness Time+ Opens • Start Workout",
        desc: `Begin ${config.amWorkoutMinutes}m prescribed strength & longevity routine. Gym is quiet and uncrowded.`,
        iconType: "gym",
        highlight: true,
      },
      {
        time: format12Hour(finishWorkout),
        title: "Finish Workout • Dry Sauna",
        desc: `Enter Dry Finnish Sauna for ${config.amSaunaMinutes}m. Drives heat shock proteins and cardiovascular health.`,
        iconType: "sauna",
      },
      {
        time: format12Hour(finishSauna),
        title: "Cool Shower & Executive Grooming",
        desc: "Refreshing shower and dressing in Fitness Time+ executive locker lounge.",
        iconType: "shower",
      },
      {
        time: format12Hour(finishGrooming),
        title: "Depart for Saudi Technic",
        desc: `Drive to Saudi Technic (${config.amCommuteToWorkMinutes}m commute). Feel energized and focused.`,
        iconType: "commute",
      },
      {
        time: format12Hour(arriveWork),
        title: "Arrive at Saudi Technic",
        desc: "Ready for leadership meetings with peak morning cognitive clarity and dopamine.",
        iconType: "work",
        highlight: true,
      },
      {
        time: "1:30 PM",
        title: "Caffeine Cutoff Window",
        desc: "Enjoy Saudi coffee before 1:30 PM; switch to water or herbal tea for sleep defense.",
        iconType: "coffee",
      },
      {
        time: "7:00 PM",
        title: "Workday Finish • Evening 100% Free",
        desc: "Head home to family. Gym is already done—evening is completely peaceful.",
        iconType: "dinner",
      },
      {
        time: format12Hour(targetBedtime),
        title: `Recommended Bedtime (${config.sleepTargetHours}h Sleep)`,
        desc: "Bedroom AC set to 20°C. Deep restorative sleep to recover for tomorrow.",
        iconType: "sleep",
      },
    ];
  } else {
    // PM MODE
    const workEnd = config.pmWorkEnd || "19:00";
    const arriveGym = addMinutesToTime(workEnd, config.pmCommuteToGymMinutes || 15);
    const finishWorkout = addMinutesToTime(arriveGym, config.pmWorkoutMinutes || 42);
    const finishSauna = addMinutesToTime(finishWorkout, config.pmSaunaMinutes || 15);
    const finishShower = addMinutesToTime(finishSauna, config.pmShowerMinutes || 15);
    const arriveHome = addMinutesToTime(finishShower, config.pmCommuteHomeMinutes || 15);

    return [
      {
        time: "6:30 AM",
        title: "Wake Up & Morning Light",
        desc: "Hydrate with water and view morning sunlight on the drive to Saudi Technic.",
        iconType: "wake",
      },
      {
        time: "7:30 AM",
        title: "Arrive at Saudi Technic",
        desc: "Executive work hours and high-priority leadership sessions.",
        iconType: "work",
      },
      {
        time: "1:30 PM",
        title: "Caffeine Cutoff Window",
        desc: "Last Saudi coffee of the day to ensure clear adenosine receptors at night.",
        iconType: "coffee",
      },
      {
        time: format12Hour(workEnd),
        title: "Leave Saudi Technic • Head to Gym",
        desc: "Drive directly to Fitness Time+ in Jeddah. Gym session acts as mental boundary.",
        iconType: "commute",
      },
      {
        time: format12Hour(arriveGym),
        title: "Arrive Fitness Time+ • Start Workout",
        desc: `Begin ${config.pmWorkoutMinutes}m routine. Sweats off boardroom tension and mental fatigue.`,
        iconType: "gym",
        highlight: true,
      },
      {
        time: format12Hour(finishWorkout),
        title: "Finish Workout • Dry Sauna & Jacuzzi",
        desc: `Relax in Finnish Sauna for ${config.pmSaunaMinutes}m followed by warm jacuzzi massage.`,
        iconType: "sauna",
      },
      {
        time: format12Hour(finishSauna),
        title: "Refreshing Shower & Dress",
        desc: "Cool shower to stop sweating and reset autonomic nervous system.",
        iconType: "shower",
      },
      {
        time: format12Hour(arriveHome),
        title: "Arrive Home Fully Decompressed",
        desc: "Work stress is washed off at the gym. Arrive home calm and relaxed.",
        iconType: "commute",
      },
      {
        time: "8:50 PM",
        title: "Light Executive Dinner",
        desc: "High protein (grilled fish or chicken) + vegetables. Avoid heavy carbs.",
        iconType: "dinner",
      },
      {
        time: "11:00 PM",
        title: "Restorative Sleep Window",
        desc: "Cool bedroom AC. Wake up at 6:30 AM feeling refreshed and energized.",
        iconType: "sleep",
      },
    ];
  }
}
