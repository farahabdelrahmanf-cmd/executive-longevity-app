import { useState, useEffect } from "react";
import { Download, X, Smartphone, Apple, CheckCircle2 } from "lucide-react";

interface InstallGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  deferredPrompt: any;
  onTriggerInstall: () => void;
}

export const InstallGuideModal = ({
  isOpen,
  onClose,
  deferredPrompt,
  onTriggerInstall,
}: InstallGuideModalProps) => {
  const [isApple, setIsApple] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const ua = navigator.userAgent || "";
      const isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
      setIsApple(isIOS);
    }
  }, []);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-[#091710] border border-emerald-500/40 rounded-3xl w-full max-w-md p-6 shadow-2xl relative text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/80 transition"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 mb-1">
          <Download className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Home Screen App Installation
          </span>
        </div>
        <h2 className="text-lg font-extrabold text-white tracking-tight">
          Install Longevity OS on Your Phone
        </h2>
        <p className="text-xs text-slate-300 mt-0.5">
          Get 1-tap full-screen gym access with zero browser bars.
        </p>

        {/* Device Switcher / Guides */}
        <div className="mt-4 space-y-4">
          
          {/* Samsung Galaxy Guide */}
          <div className={`p-4 rounded-2xl border transition-all ${!isApple ? "bg-emerald-950/40 border-emerald-500/40" : "bg-slate-900/60 border-slate-800"}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-emerald-400" />
                <span>For Samsung Galaxy (Your Dad)</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
                Android / One UI
              </span>
            </div>

            <ol className="text-xs text-slate-300 space-y-1.5 list-decimal list-inside leading-relaxed">
              <li>Open link in <strong>Samsung Internet</strong> or <strong>Chrome</strong>.</li>
              <li>Tap the green <strong>"Install"</strong> banner at the top, OR tap the <strong>3 dots (⋮ / ≡)</strong> in the corner.</li>
              <li>Tap <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.</li>
            </ol>

            {deferredPrompt && (
              <button
                onClick={() => {
                  onTriggerInstall();
                  onClose();
                }}
                className="mt-3 w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>1-Tap Install on this Samsung Device</span>
              </button>
            )}
          </div>

          {/* Apple iPhone Guide */}
          <div className={`p-4 rounded-2xl border transition-all ${isApple ? "bg-emerald-950/40 border-emerald-500/40" : "bg-slate-900/60 border-slate-800"}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <Apple className="w-4 h-4 text-slate-300" />
                <span>For Apple iPhone (Your Phone)</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                iOS Safari
              </span>
            </div>

            <ol className="text-xs text-slate-300 space-y-1.5 list-decimal list-inside leading-relaxed">
              <li>Open link in <strong>Safari</strong> on your iPhone.</li>
              <li>Tap the <strong>Share button</strong> (the square with arrow pointing up <span className="font-mono text-amber-300">⎋</span> at the bottom).</li>
              <li>Scroll down and tap <strong>"Add to Home Screen"</strong> (➕).</li>
              <li>Tap <strong>Add</strong> in the top-right corner.</li>
            </ol>
          </div>

        </div>

        {/* Footer Note */}
        <div className="mt-4 p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-2 text-[11px] text-slate-400">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
          <span>
            Once added, the official <strong>Saudia Technic Longevity</strong> icon sits on the phone screen and launches in complete full screen, working even when offline in gym locker rooms.
          </span>
        </div>
      </div>
    </div>
  );
};
