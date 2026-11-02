import { useState, useEffect } from "react";
import { Flame, Waves, Wind, X, Play, Pause, RotateCcw, ShieldCheck, CheckCircle2 } from "lucide-react";
import { soundManager } from "../utils/audio";

interface RecoveryGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CircuitStep {
  name: string;
  facility: string;
  temp: string;
  durationSeconds: number;
  instruction: string;
}

export const RecoveryGuideModal = ({
  isOpen,
  onClose,
}: RecoveryGuideModalProps) => {
  const [activeTab, setActiveTab] = useState<"circuit" | "sauna" | "jacuzzi" | "steam">("circuit");

  const circuitSteps: CircuitStep[] = [
    {
      name: "Step 1: Dry Finnish Sauna",
      facility: "Fitness Time+ Dry Sauna",
      temp: "80°C - 85°C",
      durationSeconds: 15 * 60,
      instruction: "Relax on the middle bench. Focus on calm nasal breathing. Drives heat shock proteins (HSPs).",
    },
    {
      name: "Step 2: Cold Plunge / Cold Rinse",
      facility: "Cold Jacuzzi or Cool Shower",
      temp: "14°C - 16°C",
      durationSeconds: 2 * 60,
      instruction: "Submerge to clavicles. Slow your exhale to control the cold gasp. Triggers rapid vascular pumping.",
    },
    {
      name: "Step 3: Hot Jacuzzi Hydro-Massage",
      facility: "Warm Jacuzzi",
      temp: "38°C - 40°C",
      durationSeconds: 6 * 60,
      instruction: "Place lower back and calves against the hydro jets. Feel muscular tension melt away.",
    },
    {
      name: "Step 4: Lounge Rehydration & Reset",
      facility: "Relaxation Lounge",
      temp: "Ambient",
      durationSeconds: 5 * 60,
      instruction: "Drink 500ml water with sodium/potassium electrolytes. Transition into deep calm.",
    },
  ];

  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [stepTimeLeft, setStepTimeLeft] = useState<number>(circuitSteps[0].durationSeconds);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) {
      setIsTimerRunning(false);
      return;
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !isTimerRunning) return;

    if (stepTimeLeft <= 0) {
      soundManager.playChime();
      if (currentStepIdx < circuitSteps.length - 1) {
        const nextIdx = currentStepIdx + 1;
        setCurrentStepIdx(nextIdx);
        setStepTimeLeft(circuitSteps[nextIdx].durationSeconds);
      } else {
        setIsTimerRunning(false);
      }
      return;
    }

    const interval = setInterval(() => {
      setStepTimeLeft((prev) => {
        if (prev <= 1) {
          soundManager.playChime();
          if (currentStepIdx < circuitSteps.length - 1) {
            const nextIdx = currentStepIdx + 1;
            setCurrentStepIdx(nextIdx);
            return circuitSteps[nextIdx].durationSeconds;
          } else {
            setIsTimerRunning(false);
            return 0;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, isTimerRunning, stepTimeLeft, currentStepIdx, circuitSteps]);

  if (!isOpen) return null;

  const currentStep = circuitSteps[currentStepIdx];
  const stepMinutes = Math.floor(stepTimeLeft / 60);
  const stepSeconds = stepTimeLeft % 60;
  const formattedStepTime = `${String(stepMinutes).padStart(2, "0")}:${String(stepSeconds).padStart(2, "0")}`;

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
          <Flame className="w-5 h-5 text-amber-400" />
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-300">
            Fitness Time+ Recovery Sanctuary
          </span>
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">
          Thermal Contrast & Wet Hub Protocols
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Science-backed thermal protocols to reduce cardiovascular disease risk, lower blood pressure, and accelerate deep sleep.
        </p>

        {/* Nav Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950/70 rounded-xl border border-slate-800 my-4 text-xs">
          <button
            onClick={() => setActiveTab("circuit")}
            className={`flex-1 py-1.5 rounded-lg font-semibold transition text-center ${
              activeTab === "circuit"
                ? "bg-amber-500 text-slate-950 shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Contrast Circuit
          </button>
          <button
            onClick={() => setActiveTab("sauna")}
            className={`flex-1 py-1.5 rounded-lg font-semibold transition text-center ${
              activeTab === "sauna"
                ? "bg-amber-500 text-slate-950 shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Sauna
          </button>
          <button
            onClick={() => setActiveTab("jacuzzi")}
            className={`flex-1 py-1.5 rounded-lg font-semibold transition text-center ${
              activeTab === "jacuzzi"
                ? "bg-amber-500 text-slate-950 shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Jacuzzi
          </button>
          <button
            onClick={() => setActiveTab("steam")}
            className={`flex-1 py-1.5 rounded-lg font-semibold transition text-center ${
              activeTab === "steam"
                ? "bg-amber-500 text-slate-950 shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Steam
          </button>
        </div>

        {/* Tab 1: Interactive Contrast Circuit */}
        {activeTab === "circuit" && (
          <div className="space-y-4">
            
            {/* Step Progress Tracker */}
            <div className="grid grid-cols-4 gap-2">
              {circuitSteps.map((step, idx) => (
                <div
                  key={step.name}
                  onClick={() => {
                    setCurrentStepIdx(idx);
                    setStepTimeLeft(step.durationSeconds);
                    setIsTimerRunning(false);
                  }}
                  className={`cursor-pointer p-2 rounded-xl border text-center transition ${
                    idx === currentStepIdx
                      ? "bg-amber-500/20 border-amber-500/60 ring-1 ring-amber-500/30 text-amber-200"
                      : idx < currentStepIdx
                      ? "bg-emerald-950/30 border-emerald-500/40 text-emerald-300"
                      : "bg-slate-800/40 border-slate-800 text-slate-500"
                  }`}
                >
                  <div className="text-[10px] font-bold uppercase mb-0.5">
                    Step {idx + 1}
                  </div>
                  <div className="text-[11px] font-semibold truncate">
                    {step.name.split(":")[1]?.trim() || step.name}
                  </div>
                  <div className="text-[10px] opacity-75">
                    {Math.round(step.durationSeconds / 60)} min
                  </div>
                </div>
              ))}
            </div>

            {/* Active Step Card with Timer */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
              <div className="text-xs text-amber-400 font-semibold uppercase tracking-wider mb-1">
                {currentStep.facility} • {currentStep.temp}
              </div>
              <h3 className="text-base font-bold text-white mb-2">
                {currentStep.name}
              </h3>
              <p className="text-xs text-slate-300 max-w-sm mx-auto mb-4">
                {currentStep.instruction}
              </p>

              {/* Step Countdown Display */}
              <div className="text-4xl font-extrabold text-white font-mono tracking-tight mb-4">
                {formattedStepTime}
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className={`px-5 py-2 rounded-xl font-bold text-xs flex items-center gap-2 shadow-lg transition active:scale-95 ${
                    isTimerRunning
                      ? "bg-amber-500 hover:bg-amber-400 text-slate-950"
                      : "bg-emerald-500 hover:bg-emerald-400 text-slate-950"
                  }`}
                >
                  {isTimerRunning ? (
                    <>
                      <Pause className="w-3.5 h-3.5 fill-current" /> Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" /> Start Step
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    setIsTimerRunning(false);
                    setStepTimeLeft(currentStep.durationSeconds);
                  }}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 active:scale-95 transition"
                  title="Reset Step Timer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Science Rationale */}
            <div className="p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-amber-300 block mb-0.5">
                  Huberman Longevity Protocol:
                </span>
                <p className="text-slate-300 leading-relaxed">
                  Moving from 85°C heat to cold plunge causes massive peripheral vasoconstriction followed by rebound vasodilation. This vascular gymnastics improves arterial elasticity and increases circulating endorphins and norepinephrine by up to 250%.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Sauna Deep Dive */}
        {activeTab === "sauna" && (
          <div className="space-y-3 text-xs text-slate-300">
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
              <div className="flex items-center gap-2 text-amber-400 font-bold mb-2">
                <Flame className="w-4 h-4" />
                <span>Finnish Dry Sauna (80°C - 90°C)</span>
              </div>
              <p className="text-slate-300 mb-3 leading-relaxed">
                Fitness Time Plus features an authentic dry sauna room. The heat mimics moderate cardiovascular exercise, elevating heart rate to 110-130 bpm without any orthopedic joint strain.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Optimal Duration:</strong> 15 to 20 minutes, 2 to 4 times weekly.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Heat Shock Proteins:</strong> Protects brain neurons from tau protein aggregates and clears cellular debris.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Pre-Sauna Protocol:</strong> Drink 400ml water with sodium/potassium 20 mins before entering. Never enter dehydrated.</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Tab 3: Jacuzzi */}
        {activeTab === "jacuzzi" && (
          <div className="space-y-3 text-xs text-slate-300">
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
              <div className="flex items-center gap-2 text-cyan-400 font-bold mb-2">
                <Waves className="w-4 h-4" />
                <span>Hot Jacuzzi & Spinal Decompression (38°C - 40°C)</span>
              </div>
              <p className="text-slate-300 mb-3 leading-relaxed">
                The hot whirlpool at Fitness Time Plus is ideal for releasing tight lower back quadratus lumborum muscles and hip flexors after long hours of seated executive work.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span><strong>Recommended Time:</strong> 8 to 12 minutes immediately following resistance training.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span><strong>Posture in Jacuzzi:</strong> Sit with spine tall against the massage jets. Let the bubbling water massage your mid and upper back.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span><strong>Circulatory Reset:</strong> Follow with a 60-second cool water rinse on the legs to prevent blood pooling.</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Tab 4: Steam */}
        {activeTab === "steam" && (
          <div className="space-y-3 text-xs text-slate-300">
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
              <div className="flex items-center gap-2 text-indigo-400 font-bold mb-2">
                <Wind className="w-4 h-4" />
                <span>Eucalyptus Steam Bath (45°C, 100% Humidity)</span>
              </div>
              <p className="text-slate-300 mb-3 leading-relaxed">
                The wet steam environment provides intense respiratory and sinus relief. In Jeddah's desert climate, indoor AC dries out mucous membranes; the steam room restores hydration to vocal cords and bronchial tracts.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                  <span><strong>Duration:</strong> 10 to 15 minutes. Inhale slowly through the nose.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                  <span><strong>Autonomic Downshift:</strong> Perfect for Tuesdays and Thursdays when winding down from high-tension executive meetings.</span>
                </li>
              </ul>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
