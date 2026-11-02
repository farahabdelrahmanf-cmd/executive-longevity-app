import { useState } from "react";
import { Settings, X, Save, RotateCcw, User, Briefcase, Target, Clock } from "lucide-react";
import type { UserPreferences } from "../types";
import { savePreferences } from "../utils/storage";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  preferences: UserPreferences;
  onSavePreferences: (prefs: UserPreferences) => void;
}

export const SettingsModal = ({
  isOpen,
  onClose,
  preferences,
  onSavePreferences,
}: SettingsModalProps) => {
  const [name, setName] = useState(preferences.name);
  const [role, setRole] = useState(preferences.executiveRole);
  const [targetWeight, setTargetWeight] = useState(preferences.targetWeightKg.toString());
  const [preferredSlot, setPreferredSlot] = useState(preferences.preferredSlot);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: UserPreferences = {
      ...preferences,
      name,
      executiveRole: role,
      targetWeightKg: parseFloat(targetWeight) || 95,
      preferredSlot,
    };
    savePreferences(updated);
    onSavePreferences(updated);
    onClose();
  };

  const handleResetData = () => {
    if (window.confirm("Reset all exercise logs and return to default profile?")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="bg-[#091710] border border-[#143021] rounded-3xl w-full max-w-md p-6 shadow-2xl relative my-6 text-left">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/80 hover:bg-slate-750 transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 mb-1">
          <Settings className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Profile & Executive Setup
          </span>
        </div>
        <h2 className="text-lg font-bold text-white tracking-tight">
          Executive Preferences
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-amber-400" /> Name / Greeting
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
              placeholder="e.g. Abdelrahman Farah"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-cyan-400" /> Corporate Role
            </label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
              placeholder="e.g. Vice President, Marketing & Sales • Saudia Technic"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-rose-400" /> Target Weight (kg)
              </label>
              <input
                type="number"
                step="0.5"
                value={targetWeight}
                onChange={(e) => setTargetWeight(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-indigo-400" /> Default Time Slot
              </label>
              <select
                value={preferredSlot}
                onChange={(e) => setPreferredSlot(e.target.value as "morning" | "evening")}
                className="w-full px-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
              >
                <option value="evening">Post-Work (7:15 PM)</option>
                <option value="morning">Morning (6:00 AM)</option>
              </select>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleResetData}
              className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Data</span>
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-bold bg-[#00A859] hover:bg-emerald-400 text-slate-950 text-slate-950 flex items-center gap-1.5 shadow-md shadow-amber-500/20 active:scale-95 transition"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
