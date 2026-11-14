import { useState, useEffect } from "react";
import { Download, X, Smartphone, Apple, CheckCircle2, ArrowDownCircle, MoreVertical } from "lucide-react";

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
  const [activeTab, setActiveTab] = useState<"samsung" | "apple">("samsung");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const ua = navigator.userAgent || "";
      const isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
      if (isIOS) {
        setActiveTab("apple");
      } else {
        setActiveTab("samsung");
      }
    }
  }, []);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-[#091710] border border-emerald-500/40 rounded-3xl w-full max-w-lg p-5 sm:p-6 shadow-2xl relative text-left max-h-[90vh] overflow-y-auto"
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
            One-Tap App Download
          </span>
        </div>
        <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
          Download Longevity OS to Your Phone
        </h2>
        <p className="text-xs text-slate-300 mt-0.5">
          Installs directly to your home screen with zero app store logins needed.
        </p>

        {/* Device Switcher Tabs */}
        <div className="flex items-center gap-2 mt-4 p-1 bg-slate-950/80 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActiveTab("samsung")}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
              activeTab === "samsung"
                ? "bg-emerald-600 text-white shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Samsung Galaxy (Dad)</span>
          </button>
          <button
            onClick={() => setActiveTab("apple")}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
              activeTab === "apple"
                ? "bg-slate-700 text-white shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Apple className="w-3.5 h-3.5" />
            <span>Apple iPhone</span>
          </button>
        </div>

        {/* Content based on tab */}
        <div className="mt-4 space-y-4">
          
          {/* SAMSUNG GALAXY SECTION */}
          {activeTab === "samsung" && (
            <div className="space-y-3">
              {/* If browser fired 1-tap install prompt */}
              {deferredPrompt ? (
                <div className="p-4 rounded-2xl bg-amber-500/15 border border-amber-500/40 space-y-2">
                  <div className="flex items-center gap-2 text-amber-300 text-xs font-bold">
                    <ArrowDownCircle className="w-4 h-4" />
                    <span>Instant Install Ready!</span>
                  </div>
                  <p className="text-xs text-slate-200">
                    Your Samsung Galaxy is ready. Tap below to place the official icon on your home screen:
                  </p>
                  <button
                    onClick={() => {
                      onTriggerInstall();
                      onClose();
                    }}
                    className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg transition active:scale-95"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download & Install Now</span>
                  </button>
                </div>
              ) : null}

              {/* Samsung Internet Method */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-emerald-900/40 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Method 1: Using Samsung Internet (Default)</span>
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
                    Recommended
                  </span>
                </div>

                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex items-start gap-2 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 font-bold text-[11px]">1</div>
                    <p className="leading-relaxed">
                      Look at the top URL address bar. Tap the small <strong>Download Arrow [ ⬇️ ]</strong> icon on the right side of the web address.
                    </p>
                  </div>

                  <div className="flex items-start gap-2 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 font-bold text-[11px]">2</div>
                    <p className="leading-relaxed">
                      Or tap the <strong>Menu (≡)</strong> at the bottom right ➔ Tap <strong>"Add page to"</strong> ➔ Select <strong>"App screen"</strong> or <strong>"Home screen"</strong>.
                    </p>
                  </div>
                </div>
              </div>

              {/* Google Chrome on Android Method */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2.5">
                <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <MoreVertical className="w-3.5 h-3.5" />
                  <span>Method 2: Using Google Chrome on Samsung</span>
                </span>

                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex items-start gap-2 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                    <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 font-bold text-[11px]">1</div>
                    <p className="leading-relaxed">
                      Tap the <strong>three vertical dots (⋮)</strong> in the top-right corner of Chrome.
                    </p>
                  </div>

                  <div className="flex items-start gap-2 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                    <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 font-bold text-[11px]">2</div>
                    <p className="leading-relaxed">
                      Tap <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* APPLE IPHONE SECTION */}
          {activeTab === "apple" && (
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <Apple className="w-3.5 h-3.5" />
                <span>On iPhone (Safari):</span>
              </span>

              <ol className="text-xs text-slate-300 space-y-2 leading-relaxed">
                <li className="flex items-start gap-2 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                  <span className="font-bold text-amber-400">1.</span>
                  <span>Open this link in <strong>Safari</strong> on your iPhone.</span>
                </li>
                <li className="flex items-start gap-2 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                  <span className="font-bold text-amber-400">2.</span>
                  <span>Tap the <strong>Share button</strong> (square with arrow pointing up <span className="font-mono text-amber-300">⎋</span> at the bottom).</span>
                </li>
                <li className="flex items-start gap-2 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                  <span className="font-bold text-amber-400">3.</span>
                  <span>Scroll down and tap <strong>"Add to Home Screen"</strong> (➕), then tap <strong>Add</strong>.</span>
                </li>
              </ol>
            </div>
          )}

        </div>

        {/* Footer Guarantee */}
        <div className="mt-4 p-3 rounded-xl bg-slate-950 border border-emerald-900/30 flex items-start gap-2 text-[11px] text-slate-400">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
          <span>
            Once installed, the app launches in <strong>100% full screen with no browser bars</strong>, saves all workout logs offline, and updates automatically whenever new features are added.
          </span>
        </div>
      </div>
    </div>
  );
};
