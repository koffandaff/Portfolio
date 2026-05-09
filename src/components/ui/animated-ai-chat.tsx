"use client";

import { useEffect, useRef, useCallback, useTransition, useState } from "react";
import { cn } from "@/lib/utils";
import { LoaderIcon, SendIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import * as React from "react";

// ── Avatar definitions ────────────────────────────────────────────────────────
type AvatarId = "male-1" | "male-2" | "female-1" | "female-2" | "neutral-1" | "dev";

const AVATAR_OPTIONS: { id: AvatarId; label: string; svg: React.ReactNode }[] = [
  {
    id: "male-1",
    label: "Male",
    svg: (
      <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
        <circle cx="20" cy="20" r="20" fill="#1e293b"/>
        <circle cx="20" cy="15" r="7" fill="#64748b"/>
        <ellipse cx="20" cy="35" rx="12" ry="9" fill="#64748b"/>
      </svg>
    ),
  },
  {
    id: "male-2",
    label: "Male Alt",
    svg: (
      <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
        <circle cx="20" cy="20" r="20" fill="#172554"/>
        <circle cx="20" cy="15" r="7" fill="#3b82f6"/>
        <ellipse cx="20" cy="35" rx="12" ry="9" fill="#3b82f6"/>
      </svg>
    ),
  },
  {
    id: "female-1",
    label: "Female",
    svg: (
      <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
        <circle cx="20" cy="20" r="20" fill="#2d1b4e"/>
        <circle cx="20" cy="14" r="7" fill="#a78bfa"/>
        <ellipse cx="20" cy="33" rx="13" ry="9" fill="#a78bfa"/>
        <path d="M14 14 Q20 6 26 14" stroke="#a78bfa" strokeWidth="2.5" fill="none"/>
      </svg>
    ),
  },
  {
    id: "female-2",
    label: "Female Alt",
    svg: (
      <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
        <circle cx="20" cy="20" r="20" fill="#1a2e1a"/>
        <circle cx="20" cy="14" r="7" fill="#4ade80"/>
        <ellipse cx="20" cy="33" rx="13" ry="9" fill="#4ade80"/>
        <path d="M13 13 Q20 5 27 13" stroke="#4ade80" strokeWidth="2.5" fill="none"/>
      </svg>
    ),
  },
  {
    id: "neutral-1",
    label: "Neutral",
    svg: (
      <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
        <circle cx="20" cy="20" r="20" fill="#1c1c1c"/>
        <circle cx="20" cy="15" r="7" fill="#94a3b8"/>
        <ellipse cx="20" cy="35" rx="12" ry="9" fill="#94a3b8"/>
      </svg>
    ),
  },
  {
    id: "dev",
    label: "Dev",
    svg: (
      <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
        <circle cx="20" cy="20" r="20" fill="#0c1a2e"/>
        <circle cx="20" cy="14" r="6" fill="#38bdf8"/>
        <ellipse cx="20" cy="32" rx="11" ry="8" fill="#38bdf8"/>
        <rect x="12" y="13" width="5" height="3" rx="1.5" stroke="#0c1a2e" strokeWidth="1" fill="none"/>
        <rect x="23" y="13" width="5" height="3" rx="1.5" stroke="#0c1a2e" strokeWidth="1" fill="none"/>
        <line x1="17" y1="14.5" x2="23" y2="14.5" stroke="#0c1a2e" strokeWidth="1"/>
      </svg>
    ),
  },
];

// ── Auto-resize hook ──────────────────────────────────────────────────────────
function useAutoResizeTextarea({ minHeight, maxHeight }: { minHeight: number; maxHeight?: number }) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const adjustHeight = useCallback((reset?: boolean) => {
    const el = textareaRef.current;
    if (!el) return;
    if (reset) { el.style.height = `${minHeight}px`; return; }
    el.style.height = `${minHeight}px`;
    el.style.height = `${Math.max(minHeight, Math.min(el.scrollHeight, maxHeight ?? Infinity))}px`;
  }, [minHeight, maxHeight]);
  useEffect(() => { if (textareaRef.current) textareaRef.current.style.height = `${minHeight}px`; }, [minHeight]);
  return { textareaRef, adjustHeight };
}

// ── Star Rating Picker ────────────────────────────────────────────────────────
function StarPicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onChange(s)}
          onMouseEnter={() => setHover(s)}
          onMouseLeave={() => setHover(0)}
          className="transition-transform hover:scale-110"
        >
          <svg width="28" height="28" viewBox="0 0 24 24"
            fill={(hover || value) >= s ? "#f59e0b" : "none"}
            stroke={(hover || value) >= s ? "#f59e0b" : "#475569"}
            strokeWidth="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        </button>
      ))}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export function AnimatedAIChat() {
  const [password, setPassword]   = useState("");
  const [name, setName]           = useState("");
  const [org, setOrg]             = useState("");
  const [role, setRole]           = useState("");
  const [rating, setRating]       = useState(5);
  const [avatar, setAvatar]       = useState<AvatarId>("male-1");
  const [message, setMessage]     = useState("");
  const [isTyping, setIsTyping]   = useState(false);
  const [, startTransition]       = useTransition();
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [inputFocused, setInputFocused]   = useState(false);

  const { textareaRef, adjustHeight } = useAutoResizeTextarea({ minHeight: 80, maxHeight: 200 });

  useEffect(() => {
    const h = (e: MouseEvent) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);

  const handleSend = () => {
    if (!password.trim() || !name.trim() || !role.trim() || !message.trim()) {
      setFeedbackMsg("Please fill all required fields.");
      return;
    }
    setFeedbackMsg("");
    startTransition(async () => {
      setIsTyping(true);
      try {
        const res = await fetch("/api/reviews", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password, name, org, role, rating, avatar, feedback: message }),
        });
        if (res.ok) {
          setShowModal(true);
        } else {
          const data = await res.json();
          setFeedbackMsg(data.error || "Submission failed.");
        }
      } catch {
        setFeedbackMsg("Network error. Please try again.");
      } finally {
        setIsTyping(false);
      }
    });
  };

  const selectedAvatar = AVATAR_OPTIONS.find(a => a.id === avatar)!;
  const isReady = password.trim() && name.trim() && role.trim() && message.trim();

  return (
    <div className="flex flex-col w-full items-center justify-center bg-transparent text-white p-6 relative overflow-hidden rounded-2xl">
      {/* Ambient blobs */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[128px] animate-pulse delay-700" />
      </div>

      <div className="w-full max-w-2xl mx-auto relative">
        <motion.div
          className="relative z-10 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Header */}
          <div className="text-center space-y-3">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block"
            >
              <h2 className="text-2xl font-medium tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white/90 to-white/40 pb-1">
                Leave a Review
              </h2>
              <motion.div
                className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "100%", opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </motion.div>
            <motion.p
              className="text-sm text-white/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Only authorized coworkers can leave a review.
            </motion.p>
          </div>

          {/* Card */}
          <motion.div
            className="relative backdrop-blur-2xl bg-white/[0.02] rounded-2xl border border-white/[0.05] shadow-2xl p-6"
            initial={{ scale: 0.98 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            {/* Row 1 — Password + Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col gap-2">
                <label className="text-white/60 text-xs font-medium">Access Password *</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="bg-black/50 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/20"
                  placeholder="••••••••"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-white/60 text-xs font-medium">Your Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="bg-black/50 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/20"
                  placeholder="Full Name"
                />
              </div>
            </div>

            {/* Row 2 — Org + Role */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col gap-2">
                <label className="text-white/60 text-xs font-medium">Company / University</label>
                <input
                  type="text"
                  value={org}
                  onChange={e => setOrg(e.target.value)}
                  className="bg-black/50 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/20"
                  placeholder="e.g. Nimblechapps"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-white/60 text-xs font-medium">Your Role *</label>
                <input
                  type="text"
                  value={role}
                  onChange={e => setRole(e.target.value)}
                  className="bg-black/50 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/20"
                  placeholder="e.g. Project Lead"
                />
              </div>
            </div>

            {/* Row 3 — Rating + Avatar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
              {/* Star Rating */}
              <div className="flex flex-col gap-2">
                <label className="text-white/60 text-xs font-medium">Rating *</label>
                <StarPicker value={rating} onChange={setRating} />
                <span className="text-white/30 text-xs">{rating} / 5</span>
              </div>

              {/* Avatar Picker */}
              <div className="flex flex-col gap-2">
                <label className="text-white/60 text-xs font-medium">Choose Avatar</label>
                <div className="flex gap-2 flex-wrap">
                  {AVATAR_OPTIONS.map((a) => (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => setAvatar(a.id)}
                      title={a.label}
                      className={cn(
                        "w-10 h-10 rounded-full overflow-hidden border-2 transition-all duration-200",
                        avatar === a.id
                          ? "border-sky-400 scale-110 shadow-lg shadow-sky-500/30"
                          : "border-white/10 hover:border-white/30"
                      )}
                    >
                      {a.svg}
                    </button>
                  ))}
                </div>
                {/* Preview */}
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-7 h-7 rounded-full overflow-hidden border border-white/10">{selectedAvatar.svg}</div>
                  <span className="text-white/30 text-xs">{selectedAvatar.label}</span>
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="mb-4">
              <label className="text-white/60 text-xs font-medium block mb-2">Message *</label>
              <div className="relative">
                <textarea
                  ref={textareaRef}
                  value={message}
                  onChange={e => { setMessage(e.target.value); adjustHeight(); }}
                  onFocus={() => setInputFocused(true)}
                  onBlur={() => setInputFocused(false)}
                  placeholder="Write your review here..."
                  className="w-full px-4 py-3 resize-none bg-black/50 border border-white/10 rounded-lg text-white/90 text-sm focus:outline-none focus:border-white/30 placeholder:text-white/20 transition-colors min-h-[80px]"
                  style={{ overflow: "hidden" }}
                />
              </div>
            </div>

            {/* Feedback msg */}
            {feedbackMsg && (
              <div className="text-sm text-center mb-4 text-sky-400">{feedbackMsg}</div>
            )}

            {/* Submit */}
            <div className="flex justify-end pt-2 border-t border-white/[0.05]">
              <motion.button
                type="button"
                onClick={handleSend}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                disabled={isTyping || !isReady}
                className={cn(
                  "px-5 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2",
                  isReady
                    ? "bg-white text-[#0A0A0B] shadow-lg shadow-white/10"
                    : "bg-white/[0.05] text-white/30"
                )}
              >
                {isTyping ? (
                  <LoaderIcon className="w-4 h-4 animate-spin" />
                ) : (
                  <SendIcon className="w-4 h-4" />
                )}
                Submit Review
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Mouse glow */}
      {inputFocused && (
        <motion.div
          className="absolute w-[30rem] h-[30rem] rounded-full pointer-events-none z-0 opacity-[0.03] bg-gradient-to-r from-sky-500 via-indigo-500 to-sky-500 blur-[96px]"
          animate={{ x: mousePosition.x - 400, y: mousePosition.y - 400 }}
          transition={{ type: "spring", damping: 25, stiffness: 150, mass: 0.5 }}
        />
      )}

      {/* ── Success Modal ── */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/85 backdrop-blur-2xl"
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 26 }}
              className="relative bg-[#0d0d0d] border border-white/10 rounded-[28px] max-w-sm w-full text-center overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-400/60 to-transparent" />
              <div className="p-10 flex flex-col items-center gap-5">
                {/* Avatar + checkmark */}
                <div className="relative">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-sky-500/50 shadow-xl shadow-sky-500/20">
                    {selectedAvatar.svg}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                </div>

                <div>
                  <p className="text-white/40 text-xs uppercase tracking-widest font-mono mb-1">Review Submitted</p>
                  <h3 className="text-2xl font-bold text-white">
                    Thanks, <span className="text-sky-400">{name}!</span>
                  </h3>
                </div>

                {/* Star preview */}
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(s => (
                    <svg key={s} width="18" height="18" viewBox="0 0 24 24" fill={s <= rating ? "#f59e0b" : "none"} stroke={s <= rating ? "#f59e0b" : "#374151"} strokeWidth="2">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                  ))}
                </div>

                <p className="text-white/50 text-sm leading-relaxed">
                  Your feedback has been stored. The page will refresh to show your review in the Coworker Feedback section.
                </p>

                <button
                  onClick={() => { setShowModal(false); window.location.reload(); }}
                  className="w-full py-4 rounded-xl bg-white text-black font-semibold text-sm hover:bg-sky-100 transition-colors"
                >
                  Close & Refresh
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
