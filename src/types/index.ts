export type DayOfWeek = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';

export interface ExerciseSet {
  setNumber: number;
  targetReps: string;
  loggedWeight?: number;
  loggedReps?: number;
  completed: boolean;
}

export interface Exercise {
  id: string;
  name: string;
  equipment: string;
  category: 'strength' | 'cardio' | 'mobility' | 'recovery';
  targetSets: number;
  targetReps: string;
  tempo: string;
  restSeconds: number;
  rpe: string;
  quickWhy: string;
  scienceCue: string;
  executiveNote: string;
  visualKey: string;
  formKeys: string[];
  avoidKeys: string[];
  defaultSets: ExerciseSet[];
}

export interface RecoveryProtocol {
  title: string;
  durationMinutes: number;
  facility: string;
  temperature?: string;
  procedure: string[];
  scienceBenefit: string;
}

export interface DayRoutine {
  day: DayOfWeek;
  shortDay: string;
  dayType: 'workday' | 'weekend';
  title: string;
  subtitle: string;
  estimatedMinutes: number;
  focus: string;
  intensity: 'Low' | 'Moderate' | 'Recovery';
  cardioMinutes: number;
  exercises: Exercise[];
  recovery: RecoveryProtocol;
}

export interface InBodyRecord {
  id: string;
  date: string;
  weightKg: number;
  skeletalMuscleKg?: number;
  bodyFatPercent?: number;
  visceralFatLevel?: number;
  notes?: string;
}

export interface ScheduleConfig {
  mode: 'am' | 'pm';
  // AM mode parameters
  amGymArrival: string; // e.g. "06:00"
  amWorkoutMinutes: number; // e.g. 42
  amSaunaMinutes: number; // e.g. 15
  amGroomingMinutes: number; // e.g. 15
  amCommuteToWorkMinutes: number; // e.g. 20
  amCommuteToGymMinutes: number; // e.g. 20
  
  // PM mode parameters
  pmWorkEnd: string; // e.g. "19:00"
  pmCommuteToGymMinutes: number; // e.g. 15
  pmWorkoutMinutes: number; // e.g. 42
  pmSaunaMinutes: number; // e.g. 15
  pmShowerMinutes: number; // e.g. 15
  pmCommuteHomeMinutes: number; // e.g. 15

  // Targets
  sleepTargetHours: number; // e.g. 7.5
}

export interface TimelineEvent {
  time: string;
  title: string;
  desc: string;
  iconType: 'wake' | 'commute' | 'gym' | 'sauna' | 'shower' | 'work' | 'coffee' | 'dinner' | 'sleep';
  highlight?: boolean;
}

export interface UserPreferences {
  name: string;
  executiveRole: string;
  preferredSlot: 'morning' | 'evening';
  targetWeightKg: number;
  scheduleConfig: ScheduleConfig;
}
