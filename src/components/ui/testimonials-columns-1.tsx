"use client";
import React from "react";
import { motion } from "framer-motion";

// Material-style SVG avatars keyed by avatar ID
const AVATAR_SVG: Record<string, React.ReactNode> = {
  "male-1": (
    <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
      <circle cx="20" cy="20" r="20" fill="#1e293b"/>
      <circle cx="20" cy="15" r="7" fill="#64748b"/>
      <ellipse cx="20" cy="35" rx="12" ry="9" fill="#64748b"/>
    </svg>
  ),
  "male-2": (
    <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
      <circle cx="20" cy="20" r="20" fill="#172554"/>
      <circle cx="20" cy="15" r="7" fill="#3b82f6"/>
      <ellipse cx="20" cy="35" rx="12" ry="9" fill="#3b82f6"/>
    </svg>
  ),
  "female-1": (
    <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
      <circle cx="20" cy="20" r="20" fill="#2d1b4e"/>
      <circle cx="20" cy="14" r="7" fill="#a78bfa"/>
      <ellipse cx="20" cy="33" rx="13" ry="9" fill="#a78bfa"/>
      <path d="M14 14 Q20 6 26 14" stroke="#a78bfa" strokeWidth="2.5" fill="none"/>
    </svg>
  ),
  "female-2": (
    <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
      <circle cx="20" cy="20" r="20" fill="#1a2e1a"/>
      <circle cx="20" cy="14" r="7" fill="#4ade80"/>
      <ellipse cx="20" cy="33" rx="13" ry="9" fill="#4ade80"/>
      <path d="M13 13 Q20 5 27 13" stroke="#4ade80" strokeWidth="2.5" fill="none"/>
    </svg>
  ),
  "neutral-1": (
    <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
      <circle cx="20" cy="20" r="20" fill="#1c1c1c"/>
      <circle cx="20" cy="15" r="7" fill="#94a3b8"/>
      <ellipse cx="20" cy="35" rx="12" ry="9" fill="#94a3b8"/>
    </svg>
  ),
  "dev": (
    <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
      <circle cx="20" cy="20" r="20" fill="#0c1a2e"/>
      <circle cx="20" cy="14" r="6" fill="#38bdf8"/>
      <ellipse cx="20" cy="32" rx="11" ry="8" fill="#38bdf8"/>
      {/* glasses */}
      <rect x="12" y="13" width="5" height="3" rx="1.5" stroke="#0c1a2e" strokeWidth="1" fill="none"/>
      <rect x="23" y="13" width="5" height="3" rx="1.5" stroke="#0c1a2e" strokeWidth="1" fill="none"/>
      <line x1="17" y1="14.5" x2="23" y2="14.5" stroke="#0c1a2e" strokeWidth="1"/>
    </svg>
  ),
};

function AvatarDisplay({ avatar }: { avatar: string }) {
  if (AVATAR_SVG[avatar]) {
    return (
      <div className="h-10 w-10 rounded-full overflow-hidden border border-white/10 flex-shrink-0">
        {AVATAR_SVG[avatar]}
      </div>
    );
  }
  // fallback for old emoji data
  return (
    <div className="h-10 w-10 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center text-lg flex-shrink-0">
      {avatar || "👤"}
    </div>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 mt-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} width="12" height="12" viewBox="0 0 24 24" fill={s <= rating ? "#f59e0b" : "none"} stroke={s <= rating ? "#f59e0b" : "#475569"} strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </div>
  );
}

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: { text: string; avatar: string; name: string; role: string; rating: number }[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{ duration: props.duration || 10, repeat: Infinity, ease: "linear", repeatType: "loop" }}
        className="flex flex-col gap-6 pb-6"
      >
        {[...new Array(2).fill(0).map((_, index) => (
          <React.Fragment key={index}>
            {props.testimonials.map(({ text, avatar, name, role, rating }, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur max-w-xs w-full shadow-xl"
              >
                {/* Stars */}
                <StarRating rating={rating} />
                {/* Text */}
                <p className="text-white/80 text-sm leading-relaxed mt-3">{text}</p>
                {/* Author */}
                <div className="flex items-center gap-3 mt-5 pt-4 border-t border-white/[0.07]">
                  <AvatarDisplay avatar={avatar} />
                  <div className="flex flex-col min-w-0">
                    <span className="font-semibold text-white text-sm truncate">{name}</span>
                    <span className="text-white/40 text-xs truncate">{role}</span>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))]}
      </motion.div>
    </div>
  );
};

export { AVATAR_SVG };
