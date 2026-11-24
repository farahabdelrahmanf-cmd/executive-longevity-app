import { useState, useEffect } from "react";
import {
  Download,
  X,
  Smartphone,
  Apple,
  CheckCircle2,
  ArrowDownCircle,
  MoreVertical,
  QrCode,
  ExternalLink,
  AlertTriangle,
  Compass,
} from "lucide-react";
import { resolveAsset } from "../utils/assets";

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
  const [activeTab, setActiveTab] = useState<"samsung" | "qr" | "apple">("samsung");
  const [isInApp, setIsInApp] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const ua = navigator.userAgent || "";
      const isIOS =
        /iPad|iPhone|iPod/.test(ua) ||
        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
      const isAppWebView =
        /WhatsApp|FBAN|FBAV|Instagram|Line|Snapchat|Twitter|MicroMessenger/i.test(ua) ||
        (/Android/i.test(ua) && /wv/.test(ua));

      setIsInApp(isAppWebView);

      if (isIOS) {
        setActiveTab("apple");
      } else {
        setActiveTab("samsung");
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in"
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
            Installation Protocol
          </span>
        </div>
        <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
          Download Longevity OS to Samsung Phone
        </h2>
        <p className="text-xs text-slate-300 mt-0.5">
          Installs directly to your home screen with zero app store logins needed.
        </p>

        {/* Device Switcher Tabs */}
        <div className="flex items-center gap-1.5 mt-4 p-1 bg-slate-950/80 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActiveTab("samsung")}
            className={`flex-1 py-2 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              activeTab === "samsung"
                ? "bg-emerald-600 text-white shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Samsung (Dad)</span>
          </button>
          <button
            onClick={() => setActiveTab("qr")}
            className={`flex-1 py-2 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              activeTab === "qr"
                ? "bg-amber-500 text-slate-950 shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Scan QR</span>
          </button>
          <button
            onClick={() => setActiveTab("apple")}
            className={`flex-1 py-2 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              activeTab === "apple"
                ? "bg-slate-700 text-white shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Apple className="w-3.5 h-3.5" />
            <span>iPhone</span>
          </button>
        </div>

        {/* Content based on tab */}
        <div className="mt-4 space-y-4">
          
          {/* ================= SAMSUNG GALAXY TAB ================= */}
          {activeTab === "samsung" && (
            <div className="space-y-3.5">

              {/* CRITICAL: WhatsApp / In-App Browser Warning Card */}
              {isInApp && (
                <div className="p-4 rounded-2xl bg-amber-500/20 border border-amber-400/50 space-y-2.5">
                  <div className="flex items-center gap-2 text-amber-300 text-xs font-bold">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Viewing Inside WhatsApp</span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    WhatsApp does not allow saving apps directly to your Samsung phone. Tap below to launch directly in your phone's browser:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    <a
                      href="intent://farahabdelrahmanf-cmd.github.io/executive-longevity-app/#Intent;scheme=https;package=com.sec.android.app.sbrowser;end"
                      className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition active:scale-95 text-center"
                    >
                      <Compass className="w-3.5 h-3.5" />
                      <span>Samsung Internet</span>
                    </a>
                    <a
                      href="intent://farahabdelrahmanf-cmd.github.io/executive-longevity-app/#Intent;scheme=https;package=com.android.chrome;end"
                      className="py-2.5 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition active:scale-95 text-center"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Google Chrome</span>
                    </a>
                  </div>
                  <div className="text-[11px] text-amber-200/90 pt-1 border-t border-amber-500/30">
                    💡 <em>Or tap the <strong>three dots [ ⋮ ]</strong> at top-right of your WhatsApp screen ➔ select <strong>"Open in Chrome"</strong> or <strong>"Samsung Internet"</strong>.</em>
                  </div>
                </div>
              )}

              {/* Instant 1-Tap Install Button (if browser prompt is ready) */}
              {deferredPrompt ? (
                <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950 to-[#006937]/50 border border-emerald-400/60 space-y-2">
                  <div className="flex items-center gap-2 text-amber-300 text-xs font-bold">
                    <ArrowDownCircle className="w-4 h-4" />
                    <span>Instant Install Ready!</span>
                  </div>
                  <p className="text-xs text-slate-200">
                    Your Samsung Galaxy is ready. Tap below to place the official Longevity OS icon on your home screen:
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

              {/* Method 1: Samsung Internet (Standard on all Galaxy phones) */}
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
                      Tap <strong>"Install"</strong> when prompted. The app icon will appear immediately on your home screen!
                    </p>
                  </div>

                  <div className="text-[11px] text-slate-400 italic pt-1 pl-1">
                    Alternative: Tap bottom-right <strong>Menu (≡)</strong> ➔ <strong>"Add page to"</strong> ➔ <strong>"App screen"</strong>.
                  </div>
                </div>
              </div>

              {/* Method 2: Google Chrome on Samsung */}
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

          {/* ================= SCAN QR CODE TAB ================= */}
          {activeTab === "qr" && (
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-amber-500/30 text-center space-y-3">
              <span className="text-xs font-bold text-amber-300 flex items-center justify-center gap-1.5">
                <QrCode className="w-3.5 h-3.5" />
                <span>Instant Camera Scan (Zero WhatsApp Links)</span>
              </span>
              <p className="text-xs text-slate-300">
                Point Dad's Samsung Galaxy camera at this QR code to open directly in Samsung Internet:
              </p>

              {/* High-Resolution QR Code */}
              <div className="flex justify-center py-2">
                <div className="p-3 bg-white rounded-2xl shadow-xl inline-block border-2 border-emerald-500">
                  <img
                    src={resolveAsset("/samsung_galaxy_qr.png")}
                    alt="Scan to Install on Samsung Galaxy"
                    className="w-48 h-48 object-contain"
                  />
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-left bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-amber-400">1.</span>
                  <span>Open the <strong>Camera</strong> on Dad's phone.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-amber-400">2.</span>
                  <span>Point at this code & tap the link banner.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-amber-400">3.</span>
                  <span>Tap the <strong>[ ⬇️ ] Download Icon</strong> in the address bar to install!</span>
                </div>
              </div>
            </div>
          )}

          {/* ================= APPLE IPHONE TAB ================= */}
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
            Once installed, the app launches in <strong>100% full screen with zero browser bars</strong>, saves all workout logs offline, and updates automatically whenever new features are added.
          </span>
        </div>
      </div>
    </div>
  );
};
