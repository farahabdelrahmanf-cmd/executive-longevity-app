import type { InBodyRecord, UserPreferences, ExerciseSet } from '../types';
import { DEFAULT_SCHEDULE_CONFIG } from './scheduleCalculator';

const STORAGE_KEYS = {
  PREFS: 'apex_executive_prefs',
  LOGGED_SETS: 'apex_executive_logged_sets',
  COMPLETED_DAYS: 'apex_executive_completed_days',
  INBODY_RECORDS: 'apex_executive_inbody_records',
  CUSTOM_NOTES: 'apex_executive_custom_notes',
};

const DEFAULT_PREFS: UserPreferences = {
  name: 'Abdelrahman Farah',
  executiveRole: 'Vice President, Marketing & Sales • Saudia Technic',
  preferredSlot: 'morning',
  targetWeightKg: 95,
  scheduleConfig: DEFAULT_SCHEDULE_CONFIG,
};

const DEFAULT_INBODY: InBodyRecord[] = [
  {
    id: 'initial-entry',
    date: '2026-10-15',
    weightKg: 110.0,
    skeletalMuscleKg: 40.2,
    bodyFatPercent: 32.5,
    visceralFatLevel: 14,
    notes: 'Baseline check at Fitness Time Plus Jeddah InBody station.'
  }
];

export function getPreferences(): UserPreferences {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PREFS);
    if (!data) return DEFAULT_PREFS;
    const parsed = JSON.parse(data);
    return {
      ...DEFAULT_PREFS,
      ...parsed,
      scheduleConfig: {
        ...DEFAULT_SCHEDULE_CONFIG,
        ...(parsed.scheduleConfig || {})
      }
    };
  } catch {
    return DEFAULT_PREFS;
  }
}

export function savePreferences(prefs: UserPreferences): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PREFS, JSON.stringify(prefs));
  } catch (e) {
    console.error('Failed to save preferences', e);
  }
}

export function getLoggedSets(exerciseId: string): ExerciseSet[] | null {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.LOGGED_SETS);
    if (!data) return null;
    const parsed = JSON.parse(data);
    return parsed[exerciseId] || null;
  } catch {
    return null;
  }
}

export function saveLoggedSets(exerciseId: string, sets: ExerciseSet[]): void {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.LOGGED_SETS);
    const parsed = data ? JSON.parse(data) : {};
    parsed[exerciseId] = sets;
    localStorage.setItem(STORAGE_KEYS.LOGGED_SETS, JSON.stringify(parsed));
  } catch (e) {
    console.error('Failed to save sets', e);
  }
}

export function getCompletedDays(): string[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.COMPLETED_DAYS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function toggleDayCompleted(day: string): boolean {
  try {
    const list = getCompletedDays();
    const index = list.indexOf(day);
    let isCompleted = false;
    if (index >= 0) {
      list.splice(index, 1);
      isCompleted = false;
    } else {
      list.push(day);
      isCompleted = true;
    }
    localStorage.setItem(STORAGE_KEYS.COMPLETED_DAYS, JSON.stringify(list));
    return isCompleted;
  } catch {
    return false;
  }
}

export function getInBodyRecords(): InBodyRecord[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.INBODY_RECORDS);
    return data ? JSON.parse(data) : DEFAULT_INBODY;
  } catch {
    return DEFAULT_INBODY;
  }
}

export function saveInBodyRecord(record: InBodyRecord): InBodyRecord[] {
  try {
    const current = getInBodyRecords();
    const updated = [record, ...current];
    localStorage.setItem(STORAGE_KEYS.INBODY_RECORDS, JSON.stringify(updated));
    return updated;
  } catch {
    return DEFAULT_INBODY;
  }
}

export function deleteInBodyRecord(id: string): InBodyRecord[] {
  try {
    const current = getInBodyRecords();
    const updated = current.filter(r => r.id !== id);
    localStorage.setItem(STORAGE_KEYS.INBODY_RECORDS, JSON.stringify(updated));
    return updated;
  } catch {
    return DEFAULT_INBODY;
  }
}
