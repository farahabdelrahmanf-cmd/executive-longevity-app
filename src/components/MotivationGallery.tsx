import { useState, useRef, useEffect } from "react";
import {
  Heart,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Sparkles,
  ShieldCheck,
  Plus,
  Trash2,
  Image as ImageIcon
} from "lucide-react";
import { INITIAL_MOTIVATION_PHOTOS, type MotivationPhoto } from "../data/motivationPhotos";

const STORAGE_CUSTOM_PHOTOS_KEY = "apex_custom_motivation_photos";

export function MotivationGallery() {
  const [photos, setPhotos] = useState<MotivationPhoto[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_CUSTOM_PHOTOS_KEY);
      if (saved) {
        const custom: MotivationPhoto[] = JSON.parse(saved);
        // Combine initial with any custom uploaded photos
        return [...INITIAL_MOTIVATION_PHOTOS, ...custom];
      }
    } catch (e) {
      console.error("Error loading custom motivation photos", e);
    }
    return INITIAL_MOTIVATION_PHOTOS;
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCaption, setNewCaption] = useState("");
  const [newTag, setNewTag] = useState("");
  const [newImageBase64, setNewImageBase64] = useState<string | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync scroll position when activeIndex changes via buttons
  const scrollToCard = (index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cards = container.querySelectorAll<HTMLElement>(".motivation-card");
      if (cards[index]) {
        cards[index].scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
        setActiveIndex(index);
      }
    }
  };

  // Listen to scroll events to update dot indicators
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const cards = container.querySelectorAll<HTMLElement>(".motivation-card");
      const containerCenter = container.getBoundingClientRect().left + container.offsetWidth / 2;

      let closestIndex = 0;
      let minDistance = Infinity;

      cards.forEach((card, idx) => {
        const cardCenter = card.getBoundingClientRect().left + card.offsetWidth / 2;
        const dist = Math.abs(containerCenter - cardCenter);
        if (dist < minDistance) {
          minDistance = dist;
          closestIndex = idx;
        }
      });

      setActiveIndex(closestIndex);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [photos]);

  const handlePrev = () => {
    const nextIdx = Math.max(0, activeIndex - 1);
    scrollToCard(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = Math.min(photos.length - 1, activeIndex + 1);
    scrollToCard(nextIdx);
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setNewImageBase64(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleAddPhotoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImageBase64 || !newTitle.trim()) return;

    const newPhoto: MotivationPhoto = {
      id: `custom-${Date.now()}`,
      url: newImageBase64,
      title: newTitle.trim(),
      caption: newCaption.trim() || "Cherished family moment inspiring health and longevity.",
      dateTag: newTag.trim() || "Family Memory",
      aspect: "portrait",
    };

    try {
      const existingSaved = localStorage.getItem(STORAGE_CUSTOM_PHOTOS_KEY);
      const customList: MotivationPhoto[] = existingSaved ? JSON.parse(existingSaved) : [];
      const updatedCustom = [newPhoto, ...customList];
      localStorage.setItem(STORAGE_CUSTOM_PHOTOS_KEY, JSON.stringify(updatedCustom));
      setPhotos([...INITIAL_MOTIVATION_PHOTOS, ...updatedCustom]);
    } catch (err) {
      console.error("Failed to save custom photo", err);
    }

    // Reset form
    setNewTitle("");
    setNewCaption("");
    setNewTag("");
    setNewImageBase64(null);
    setIsAddModalOpen(false);
  };

  const handleDeleteCustomPhoto = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const existingSaved = localStorage.getItem(STORAGE_CUSTOM_PHOTOS_KEY);
      if (existingSaved) {
        const customList: MotivationPhoto[] = JSON.parse(existingSaved);
        const filtered = customList.filter(p => p.id !== id);
        localStorage.setItem(STORAGE_CUSTOM_PHOTOS_KEY, JSON.stringify(filtered));
        setPhotos([...INITIAL_MOTIVATION_PHOTOS, ...filtered]);
      }
    } catch (err) {
      console.error("Failed to delete custom photo", err);
    }
  };

  return (
    <section className="relative rounded-3xl bg-gradient-to-br from-[#061A0E] via-[#051108] to-[#040B06] border border-emerald-500/30 p-4 sm:p-6 shadow-2xl overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#00A859]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-emerald-900/40">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-gradient-to-r from-amber-500/20 to-emerald-500/20 text-amber-300 border border-amber-500/30 shadow-sm">
              <Heart className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>Who I Do It For • My Why</span>
            </span>
            <span className="text-[11px] text-emerald-400/80 font-mono hidden sm:inline-flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Daily Longevity Anchor
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>Every Rep, Every Drop of Sweat, Every Healthy Year</span>
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl mt-0.5 leading-relaxed">
            Preserving strength, executive vitality, and joint health for the people and moments that matter most.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-200 text-xs font-semibold transition active:scale-95 shadow-sm"
            title="Add a new family memory from your phone"
          >
            <Plus className="w-3.5 h-3.5 text-emerald-400" />
            <span>Add Photo</span>
          </button>

          <div className="flex items-center gap-1 bg-slate-900/80 border border-slate-800 rounded-xl p-1">
            <button
              onClick={handlePrev}
              disabled={activeIndex === 0}
              className="p-1.5 rounded-lg hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 transition"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-[11px] font-mono font-bold text-amber-400 px-1">
              {activeIndex + 1}/{photos.length}
            </span>
            <button
              onClick={handleNext}
              disabled={activeIndex === photos.length - 1}
              className="p-1.5 rounded-lg hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 transition"
              aria-label="Next photo"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Scrolling Gallery */}
      <div
        ref={scrollContainerRef}
        className="relative z-10 flex gap-4 overflow-x-auto pt-4 pb-2 snap-x snap-mandatory scroll-smooth scrollbar-none"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {photos.map((photo, index) => {
          const isCustom = photo.id.startsWith("custom-");
          return (
            <div
              key={photo.id}
              onClick={() => setLightboxIndex(index)}
              className="motivation-card shrink-0 snap-center w-[270px] sm:w-[310px] md:w-[330px] rounded-2xl overflow-hidden bg-slate-950/80 border border-emerald-900/40 hover:border-amber-400/60 transition-all duration-300 group cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-emerald-950/50 relative flex flex-col"
            >
              {/* Photo Container */}
              <div className="relative aspect-[3/4] sm:aspect-[4/5] w-full overflow-hidden bg-black/60">
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                {/* Top Badge */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-amber-300 border border-amber-500/30 flex items-center gap-1 shadow-md">
                    <Heart className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{photo.dateTag || "Purpose"}</span>
                  </span>

                  <div className="flex items-center gap-1">
                    {isCustom && (
                      <button
                        onClick={(e) => handleDeleteCustomPhoto(photo.id, e)}
                        className="p-1.5 rounded-full bg-red-950/80 hover:bg-red-900 text-red-300 border border-red-500/40 backdrop-blur-md transition shadow"
                        title="Delete photo"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                    <span className="p-1.5 rounded-full bg-black/50 text-white/80 group-hover:bg-amber-500 group-hover:text-black backdrop-blur-md transition-all shadow">
                      <Maximize2 className="w-3 h-3" />
                    </span>
                  </div>
                </div>

                {/* Bottom Overlay Text */}
                <div className="absolute bottom-0 inset-x-0 p-4 space-y-1">
                  <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors drop-shadow-md">
                    {photo.title}
                  </h3>
                  <p className="text-xs text-slate-200 line-clamp-2 leading-relaxed drop-shadow font-medium">
                    {photo.caption}
                  </p>
                </div>
              </div>

              {/* Card Footer Micro-Bar */}
              <div className="p-2.5 bg-gradient-to-r from-emerald-950/60 to-slate-950 border-t border-emerald-900/30 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1 text-emerald-400 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Longevity Reason #{index + 1}</span>
                </span>
                <span className="text-amber-400/80 font-medium text-[10px] group-hover:underline">
                  Tap to view
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Dots */}
      <div className="relative z-10 flex items-center justify-center gap-1.5 pt-3">
        {photos.map((_, idx) => (
          <button
            key={idx}
            onClick={() => scrollToCard(idx)}
            className={`transition-all duration-300 rounded-full ${
              idx === activeIndex
                ? "w-6 h-1.5 bg-amber-400 shadow-sm shadow-amber-400/50"
                : "w-1.5 h-1.5 bg-slate-700 hover:bg-slate-500"
            }`}
            aria-label={`Jump to photo ${idx + 1}`}
          />
        ))}
      </div>

      {/* Full-Screen Lightbox Modal */}
      {lightboxIndex !== null && photos[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-3 sm:p-6 animate-fade-in"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Top Bar */}
          <div
            className="w-full max-w-4xl flex items-center justify-between pb-3 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {photos[lightboxIndex].dateTag}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Photo {lightboxIndex + 1} of {photos.length}
              </span>
            </div>

            <button
              onClick={() => setLightboxIndex(null)}
              className="p-2 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Photo & Navigation */}
          <div
            className="relative w-full max-w-4xl max-h-[75vh] flex items-center justify-center my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={photos[lightboxIndex].url}
              alt={photos[lightboxIndex].title}
              className="max-h-[72vh] max-w-full object-contain rounded-2xl shadow-2xl border border-emerald-500/30"
            />

            {/* Navigation buttons */}
            {lightboxIndex > 0 && (
              <button
                onClick={() => setLightboxIndex(lightboxIndex - 1)}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-black/70 hover:bg-amber-500 text-white hover:text-slate-950 backdrop-blur-md transition shadow-xl"
                aria-label="Previous"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {lightboxIndex < photos.length - 1 && (
              <button
                onClick={() => setLightboxIndex(lightboxIndex + 1)}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-black/70 hover:bg-amber-500 text-white hover:text-slate-950 backdrop-blur-md transition shadow-xl"
                aria-label="Next"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Caption Card */}
          <div
            className="w-full max-w-2xl bg-gradient-to-r from-slate-950 via-emerald-950/80 to-slate-950 border border-emerald-500/30 rounded-2xl p-4 mt-3 text-center shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold text-white flex items-center justify-center gap-2">
              <Heart className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{photos[lightboxIndex].title}</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed font-medium">
              {photos[lightboxIndex].caption}
            </p>
          </div>
        </div>
      )}

      {/* Add Custom Photo Modal */}
      {isAddModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setIsAddModalOpen(false)}
        >
          <div
            className="w-full max-w-md bg-slate-900 border border-emerald-500/40 rounded-3xl p-6 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                  <ImageIcon className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-white">Add Family Memory</h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddPhotoSubmit} className="space-y-4">
              {/* Image Picker */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Select Photo from Device
                </label>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageFileChange}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full p-4 rounded-xl border-2 border-dashed border-emerald-500/40 hover:border-emerald-400 bg-slate-950/60 flex flex-col items-center justify-center gap-2 transition group"
                >
                  {newImageBase64 ? (
                    <img
                      src={newImageBase64}
                      alt="Preview"
                      className="max-h-32 rounded-lg object-contain"
                    />
                  ) : (
                    <>
                      <ImageIcon className="w-8 h-8 text-emerald-400 group-hover:scale-110 transition-transform" />
                      <span className="text-xs text-slate-300 font-medium">
                        Click or tap to upload photo
                      </span>
                      <span className="text-[10px] text-slate-500">
                        Supports Camera photos, JPG, PNG
                      </span>
                    </>
                  )}
                </button>
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Memory Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vacation with the kids"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-emerald-400"
                />
              </div>

              {/* Caption */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Why It Inspires You
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Training hard so we can climb every mountain together."
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-400 resize-none"
                />
              </div>

              {/* Tag */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Tag / Milestone
                </label>
                <input
                  type="text"
                  placeholder="e.g. Family Milestone"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-400"
                />
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newImageBase64 || !newTitle.trim()}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 shadow-md transition"
                >
                  Save to Gallery
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
