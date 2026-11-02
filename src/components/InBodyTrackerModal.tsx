import { useState } from "react";
import { Activity, X, Plus, Trash2, TrendingDown, Scale, Dumbbell, ShieldAlert } from "lucide-react";
import type { InBodyRecord } from "../types";
import { saveInBodyRecord, deleteInBodyRecord } from "../utils/storage";

interface InBodyTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  records: InBodyRecord[];
  onUpdateRecords: (updated: InBodyRecord[]) => void;
}

export const InBodyTrackerModal = ({
  isOpen,
  onClose,
  records,
  onUpdateRecords,
}: InBodyTrackerModalProps) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [weightKg, setWeightKg] = useState<string>("109.5");
  const [muscleKg, setMuscleKg] = useState<string>("40.5");
  const [fatPercent, setFatPercent] = useState<string>("32.0");
  const [visceralLevel, setVisceralLevel] = useState<string>("13");
  const [notes, setNotes] = useState<string>("");

  if (!isOpen) return null;

  const latestRecord = records[0] || null;
  const initialWeight = 110.0;
  const weightChange = latestRecord ? latestRecord.weightKg - initialWeight : 0;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord: InBodyRecord = {
      id: "inbody-" + Date.now(),
      date: new Date().toISOString().split("T")[0],
      weightKg: parseFloat(weightKg) || 110,
      skeletalMuscleKg: muscleKg ? parseFloat(muscleKg) : undefined,
      bodyFatPercent: fatPercent ? parseFloat(fatPercent) : undefined,
      visceralFatLevel: visceralLevel ? parseInt(visceralLevel, 10) : undefined,
      notes: notes || undefined,
    };
    const updated = saveInBodyRecord(newRecord);
    onUpdateRecords(updated);
    setShowAddForm(false);
    setNotes("");
  };

  const handleDelete = (id: string) => {
    const updated = deleteInBodyRecord(id);
    onUpdateRecords(updated);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-xl p-5 sm:p-7 shadow-2xl relative my-6 text-left">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/80 hover:bg-slate-750 transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 mb-1">
          <Activity className="w-5 h-5 text-cyan-400" />
          <span className="text-xs font-semibold uppercase tracking-wider text-cyan-300">
            Fitness Time+ InBody Center
          </span>
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">
          Executive Body Composition
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Track body composition scans at Fitness Time Plus. We focus on muscle preservation & visceral fat decline.
        </p>

        {/* Key Biometrics KPI Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-4">
          <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-[11px] font-medium mb-1">
              <span>Current Weight</span>
              <Scale className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="text-xl font-extrabold text-white font-mono">
              {latestRecord ? `${latestRecord.weightKg} kg` : "110 kg"}
            </div>
            <div className="text-[10px] mt-0.5 flex items-center gap-1">
              {weightChange <= 0 ? (
                <span className="text-emerald-400 font-semibold flex items-center">
                  <TrendingDown className="w-3 h-3 inline mr-0.5" />
                  {Math.abs(weightChange).toFixed(1)} kg from start
                </span>
              ) : (
                <span className="text-amber-400 font-medium">
                  +{weightChange.toFixed(1)} kg
                </span>
              )}
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-[11px] font-medium mb-1">
              <span>Skeletal Muscle</span>
              <Dumbbell className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div className="text-xl font-extrabold text-white font-mono">
              {latestRecord?.skeletalMuscleKg ? `${latestRecord.skeletalMuscleKg} kg` : "--"}
            </div>
            <div className="text-[10px] text-cyan-300 font-medium mt-0.5">
              Preserving Lean Mass
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-[11px] font-medium mb-1">
              <span>Body Fat %</span>
              <Activity className="w-3.5 h-3.5 text-indigo-400" />
            </div>
            <div className="text-xl font-extrabold text-white font-mono">
              {latestRecord?.bodyFatPercent ? `${latestRecord.bodyFatPercent}%` : "--"}
            </div>
            <div className="text-[10px] text-slate-400 font-medium mt-0.5">
              Target: Under 25%
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-[11px] font-medium mb-1">
              <span>Visceral Fat</span>
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
            </div>
            <div className="text-xl font-extrabold text-white font-mono">
              {latestRecord?.visceralFatLevel ? `Lvl ${latestRecord.visceralFatLevel}` : "Lvl 14"}
            </div>
            <div className="text-[10px] text-emerald-400 font-medium mt-0.5">
              Target: Under 10
            </div>
          </div>
        </div>

        {/* Add Scan Button */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
            InBody Scan History
          </span>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition active:scale-95 shadow-md shadow-cyan-500/20"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{showAddForm ? "Cancel" : "Log New Scan"}</span>
          </button>
        </div>

        {/* Add Entry Form */}
        {showAddForm && (
          <form
            onSubmit={handleSave}
            className="p-4 rounded-2xl bg-slate-950/90 border border-cyan-500/30 mb-4 space-y-3"
          >
            <div className="text-xs font-bold text-cyan-300 mb-2">
              Enter Scan Results from Fitness Time Plus InBody Sheet:
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Weight (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={weightKg}
                  onChange={(e) => setWeightKg(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-slate-800 border border-slate-700 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Muscle Mass (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  value={muscleKg}
                  onChange={(e) => setMuscleKg(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-slate-800 border border-slate-700 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Body Fat (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={fatPercent}
                  onChange={(e) => setFatPercent(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-slate-800 border border-slate-700 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Visceral Level (1-20)</label>
                <input
                  type="number"
                  value={visceralLevel}
                  onChange={(e) => setVisceralLevel(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-slate-800 border border-slate-700 rounded-lg text-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Notes / Observations</label>
              <input
                type="text"
                placeholder="e.g. Scanned in morning before breakfast; feeling energetic."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-slate-800 border border-slate-700 rounded-lg text-white"
              />
            </div>
            <div className="flex justify-end gap-2 pt-1">
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950"
              >
                Save Record
              </button>
            </div>
          </form>
        )}

        {/* History Table */}
        <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
          {records.map((rec) => (
            <div
              key={rec.id}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-950/50 border border-slate-800 text-xs"
            >
              <div>
                <div className="font-semibold text-white flex items-center gap-2">
                  <span>{rec.weightKg} kg</span>
                  <span className="text-slate-500 font-normal">({rec.date})</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5 flex gap-3 flex-wrap">
                  {rec.skeletalMuscleKg && <span>Muscle: {rec.skeletalMuscleKg}kg</span>}
                  {rec.bodyFatPercent && <span>Fat: {rec.bodyFatPercent}%</span>}
                  {rec.visceralFatLevel && <span>Visceral: Level {rec.visceralFatLevel}</span>}
                </div>
                {rec.notes && <div className="text-[10px] text-slate-500 italic mt-0.5">{rec.notes}</div>}
              </div>

              {records.length > 1 && (
                <button
                  onClick={() => handleDelete(rec.id)}
                  className="p-1.5 text-slate-500 hover:text-rose-400 transition"
                  title="Delete record"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
