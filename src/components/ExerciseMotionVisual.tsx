import { CheckCircle2, AlertTriangle, Activity } from "lucide-react";

interface ExerciseMotionVisualProps {
  visualKey: string;
  exerciseName: string;
  equipment: string;
  tempo: string;
  formKeys: string[];
  avoidKeys: string[];
}

export const ExerciseMotionVisual = ({
  visualKey,
  exerciseName,
  equipment,
  tempo,
  formKeys,
  avoidKeys,
}: ExerciseMotionVisualProps) => {

  const renderIllustration = () => {
    switch (visualKey) {
      case "chest-press":
        return (
          <svg className="w-full h-40" viewBox="0 0 320 160">
            {/* Machine frame */}
            <rect x="50" y="40" width="12" height="100" rx="4" fill="#1B3829" />
            <rect x="50" y="130" width="160" height="12" rx="4" fill="#1B3829" />
            <path d="M70 130 L90 70 L115 70" stroke="#006937" strokeWidth="6" strokeLinecap="round" fill="none" />
            {/* Seat & Backrest */}
            <rect x="85" y="65" width="30" height="10" rx="3" fill="#D4AF37" />
            <rect x="75" y="75" width="12" height="55" rx="3" fill="#D4AF37" />
            {/* Seated Figure */}
            <circle cx="88" cy="52" r="12" fill="#E2E8F0" />
            <path d="M85 65 L88 105 L115 110 L125 135" stroke="#E2E8F0" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            {/* Moving Arms & Handles */}
            <g className="anim-push">
              <path d="M88 75 L120 78 L145 78" stroke="#00A859" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <rect x="142" y="70" width="8" height="24" rx="2" fill="#D4AF37" />
              <path d="M146 60 L146 125" stroke="#334155" strokeWidth="3" strokeDasharray="4 4" />
            </g>
            {/* Active Muscle Glow (Chest) */}
            <circle cx="102" cy="78" r="8" fill="#00A859" opacity="0.4" className="animate-pulse" />
            {/* Motion Arrows */}
            <path d="M130 55 L160 55" stroke="#00A859" strokeWidth="2.5" strokeDasharray="3 3" markerEnd="url(#arrow)" />
            <text x="175" y="58" fill="#00A859" fontSize="10" fontWeight="bold">Press Out</text>
            <text x="175" y="74" fill="#94A3B8" fontSize="9">3s Slow Return</text>
          </svg>
        );

      case "lat-pulldown":
        return (
          <svg className="w-full h-40" viewBox="0 0 320 160">
            {/* Overhead frame & pulley */}
            <rect x="145" y="10" width="10" height="135" rx="3" fill="#1B3829" />
            <rect x="90" y="10" width="120" height="8" rx="2" fill="#1B3829" />
            <circle cx="105" cy="14" r="7" fill="#D4AF37" />
            {/* Seat and thigh pad */}
            <rect x="90" y="115" width="35" height="10" rx="3" fill="#D4AF37" />
            <rect x="115" y="98" width="18" height="8" rx="2" fill="#1B3829" />
            {/* Seated Figure */}
            <circle cx="107" cy="65" r="11" fill="#E2E8F0" />
            <path d="M107 76 L107 115 L125 115 L128 140" stroke="#E2E8F0" strokeWidth="6" strokeLinecap="round" fill="none" />
            {/* Pulley Cable & Moving Bar */}
            <g className="anim-pulldown">
              <path d="M105 14 L105 45" stroke="#64748B" strokeWidth="3" />
              <path d="M70 45 L140 45" stroke="#00A859" strokeWidth="5" strokeLinecap="round" />
              {/* Hands pulling bar */}
              <path d="M107 78 L85 47 M107 78 L125 47" stroke="#E2E8F0" strokeWidth="5" strokeLinecap="round" />
            </g>
            {/* Active Muscle Glow (Lats) */}
            <ellipse cx="107" cy="88" rx="8" ry="12" fill="#00A859" opacity="0.4" className="animate-pulse" />
            <text x="180" y="55" fill="#00A859" fontSize="10" fontWeight="bold">Drive Elbows Down</text>
            <text x="180" y="70" fill="#94A3B8" fontSize="9">To Upper Collarbone</text>
          </svg>
        );

      case "leg-press":
        return (
          <svg className="w-full h-40" viewBox="0 0 320 160">
            {/* 45-degree rails */}
            <line x1="60" y1="130" x2="190" y2="35" stroke="#1B3829" strokeWidth="10" strokeLinecap="round" />
            {/* Reclined Seat */}
            <rect x="45" y="110" width="30" height="10" rx="2" fill="#D4AF37" transform="rotate(-15 45 110)" />
            <rect x="35" y="70" width="10" height="45" rx="2" fill="#D4AF37" transform="rotate(35 35 70)" />
            {/* Reclined Figure */}
            <circle cx="48" cy="60" r="11" fill="#E2E8F0" />
            <path d="M50 72 L65 105" stroke="#E2E8F0" strokeWidth="6" strokeLinecap="round" fill="none" />
            {/* Moving Sled & Legs */}
            <g className="anim-legpress">
              <rect x="140" y="50" width="45" height="12" rx="3" fill="#00A859" transform="rotate(-45 140 50)" />
              {/* Legs bending/extending */}
              <path d="M65 105 L105 85 L145 65" stroke="#E2E8F0" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </g>
            {/* Muscle highlight: Quads & Glutes */}
            <circle cx="85" cy="95" r="9" fill="#00A859" opacity="0.4" className="animate-pulse" />
            <text x="175" y="90" fill="#00A859" fontSize="10" fontWeight="bold">Push Through Heels</text>
            <text x="175" y="105" fill="#EF4444" fontSize="9">Never Lock Knees</text>
          </svg>
        );

      case "farmer-walk":
      case "suitcase-carry":
        return (
          <svg className="w-full h-40" viewBox="0 0 320 160">
            {/* Walking Ground */}
            <line x1="30" y1="140" x2="290" y2="140" stroke="#1B3829" strokeWidth="4" />
            {/* Walking Figure */}
            <g className="anim-carry">
              <circle cx="100" cy="40" r="12" fill="#E2E8F0" />
              {/* Upright spine */}
              <line x1="100" y1="52" x2="100" y2="98" stroke="#E2E8F0" strokeWidth="7" strokeLinecap="round" />
              {/* Arms holding dumbbell */}
              <line x1="100" y1="62" x2="102" y2="95" stroke="#E2E8F0" strokeWidth="5" strokeLinecap="round" />
              <rect x="94" y="94" width="16" height="12" rx="3" fill="#D4AF37" />
              {/* Walking stride legs */}
              <path d="M100 98 L85 138 M100 98 L115 138" stroke="#E2E8F0" strokeWidth="6" strokeLinecap="round" fill="none" />
            </g>
            {/* Grip & Core glow */}
            <circle cx="102" cy="98" r="8" fill="#00A859" opacity="0.5" className="animate-pulse" />
            <ellipse cx="100" cy="80" rx="6" ry="12" fill="#006937" opacity="0.4" />
            {/* Cues */}
            <text x="145" y="60" fill="#D4AF37" fontSize="11" fontWeight="bold">Chest Proud • Tall Spine</text>
            <text x="145" y="78" fill="#00A859" fontSize="10">Crush Grip on Dumbbell</text>
            <text x="145" y="95" fill="#94A3B8" fontSize="9">Clinically Proven Longevity Drill</text>
          </svg>
        );

      case "incline-treadmill":
        return (
          <svg className="w-full h-40" viewBox="0 0 320 160">
            {/* Incline Ramp (10%) */}
            <path d="M40 135 L200 100 L205 135 Z" fill="#0D2317" />
            <line x1="40" y1="135" x2="200" y2="100" stroke="#006937" strokeWidth="6" strokeLinecap="round" />
            {/* Console and Handrails */}
            <rect x="195" y="70" width="8" height="35" fill="#1B3829" />
            <rect x="185" y="65" width="20" height="12" rx="2" fill="#D4AF37" />
            {/* Walking Figure */}
            <g className="anim-carry">
              <circle cx="110" cy="45" r="11" fill="#E2E8F0" />
              <line x1="110" y1="56" x2="114" y2="92" stroke="#E2E8F0" strokeWidth="6" strokeLinecap="round" />
              {/* Natural arm swing */}
              <path d="M110 65 L95 85 M110 65 L125 78" stroke="#E2E8F0" strokeWidth="4" strokeLinecap="round" />
              {/* Walking incline legs */}
              <path d="M114 92 L95 125 M114 92 L135 115" stroke="#00A859" strokeWidth="5" strokeLinecap="round" />
            </g>
            <text x="175" y="45" fill="#00A859" fontSize="11" fontWeight="bold">Zone 2 Aerobic Engine</text>
            <text x="175" y="60" fill="#D4AF37" fontSize="10">8-10% Incline • 4.0 km/h</text>
            <text x="175" y="75" fill="#94A3B8" fontSize="9">Nasal Breathing (Burns Fat)</text>
          </svg>
        );

      case "dead-hang":
        return (
          <svg className="w-full h-40" viewBox="0 0 320 160">
            {/* Overhead Bar */}
            <rect x="80" y="15" width="160" height="8" rx="3" fill="#D4AF37" />
            {/* Hanging Figure */}
            <circle cx="160" cy="52" r="11" fill="#E2E8F0" />
            {/* Arms reaching straight up */}
            <line x1="145" y1="23" x2="155" y2="45" stroke="#E2E8F0" strokeWidth="5" strokeLinecap="round" />
            <line x1="175" y1="23" x2="165" y2="45" stroke="#E2E8F0" strokeWidth="5" strokeLinecap="round" />
            {/* Elongated Spine */}
            <line x1="160" y1="63" x2="160" y2="105" stroke="#00A859" strokeWidth="6" strokeLinecap="round" />
            <line x1="160" y1="105" x2="160" y2="142" stroke="#E2E8F0" strokeWidth="5" strokeLinecap="round" />
            {/* Decompression Waves */}
            <path d="M140 80 Q130 85 140 90 M180 80 Q190 85 180 90" stroke="#00A859" strokeWidth="2.5" fill="none" />
            <text x="195" y="55" fill="#00A859" fontSize="11" fontWeight="bold">Spine Decompression</text>
            <text x="195" y="70" fill="#94A3B8" fontSize="9">Relieves L4-L5 pressure</text>
            <text x="195" y="85" fill="#D4AF37" fontSize="9">Opens shoulder joints</text>
          </svg>
        );

      case "pool-swim":
      case "pool-stretch":
        return (
          <svg className="w-full h-40" viewBox="0 0 320 160">
            {/* Water Line & Pool Basin */}
            <rect x="30" y="80" width="260" height="70" rx="6" fill="#051C1A" />
            <path d="M30 85 Q70 78 110 85 T190 85 T270 85" stroke="#00A859" strokeWidth="3" fill="none" />
            {/* Floating / Swimming Figure */}
            <g className="anim-float">
              <circle cx="130" cy="75" r="10" fill="#E2E8F0" />
              <path d="M130 85 L180 88 L205 92" stroke="#E2E8F0" strokeWidth="6" strokeLinecap="round" fill="none" />
              <path d="M130 80 L110 95 L90 85" stroke="#00A859" strokeWidth="4" strokeLinecap="round" fill="none" />
            </g>
            <text x="170" y="45" fill="#00A859" fontSize="11" fontWeight="bold">Zero-Gravity Aquatic Relief</text>
            <text x="170" y="60" fill="#94A3B8" fontSize="9">90% Bodyweight Removed</text>
            <text x="170" y="75" fill="#D4AF37" fontSize="9">Restores Stiff Joints</text>
          </svg>
        );

      default:
        // Generic strength machine animation
        return (
          <svg className="w-full h-40" viewBox="0 0 320 160">
            <rect x="60" y="30" width="14" height="110" rx="3" fill="#1B3829" />
            <rect x="60" y="125" width="140" height="14" rx="3" fill="#1B3829" />
            <circle cx="110" cy="55" r="11" fill="#E2E8F0" />
            <line x1="110" y1="66" x2="110" y2="105" stroke="#E2E8F0" strokeWidth="6" strokeLinecap="round" />
            <g className="anim-push">
              <path d="M110 75 L135 78 L160 78" stroke="#00A859" strokeWidth="6" strokeLinecap="round" />
              <rect x="156" y="70" width="8" height="20" rx="2" fill="#D4AF37" />
            </g>
            <ellipse cx="110" cy="85" rx="7" ry="10" fill="#00A859" opacity="0.4" className="animate-pulse" />
            <text x="180" y="60" fill="#00A859" fontSize="11" fontWeight="bold">Smooth Controlled Cable</text>
            <text x="180" y="75" fill="#D4AF37" fontSize="10">{tempo}</text>
            <text x="180" y="90" fill="#94A3B8" fontSize="9">Safe Guided Range</text>
          </svg>
        );
    }
  };

  return (
    <div className="bg-slate-950/70 border border-slate-800/90 rounded-2xl p-3.5 sm:p-4 my-3 text-left">
      
      {/* Visual Animation Header */}
      <div className="flex items-center justify-between mb-2 flex-wrap gap-1">
        <div className="flex items-center gap-1.5">
          <Activity className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
            {equipment}: {exerciseName}
          </span>
        </div>
        <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-900 text-amber-300 border border-amber-500/20">
          Cadence: {tempo}
        </span>
      </div>

      {/* Animated SVG Diagram Canvas */}
      <div className="bg-gradient-to-b from-[#06140C] to-[#0A1810] border border-[#143021] rounded-xl p-2 flex items-center justify-center overflow-hidden shadow-inner">
        {renderIllustration()}
      </div>

      {/* Form & Injury Prevention Checklist */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-3 pt-3 border-t border-slate-800/80 text-xs">
        
        {/* Do This (Safe Form) */}
        <div className="space-y-1.5 p-2.5 rounded-xl bg-emerald-950/15 border border-emerald-500/20">
          <div className="font-bold text-emerald-400 flex items-center gap-1 mb-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Do This (Safe Form):</span>
          </div>
          {formKeys.map((item, idx) => (
            <div key={idx} className="flex items-start gap-1.5 text-slate-300 text-[11px] leading-relaxed">
              <span className="text-emerald-400 font-bold">•</span>
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* Avoid This (Prevent Injury) */}
        <div className="space-y-1.5 p-2.5 rounded-xl bg-rose-950/15 border border-rose-500/20">
          <div className="font-bold text-rose-400 flex items-center gap-1 mb-1">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Avoid (Prevent Injury):</span>
          </div>
          {avoidKeys.map((item, idx) => (
            <div key={idx} className="flex items-start gap-1.5 text-slate-300 text-[11px] leading-relaxed">
              <span className="text-rose-400 font-bold">•</span>
              <span>{item}</span>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
