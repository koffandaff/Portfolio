"use client"
import React, { useEffect, useState, memo } from 'react';

// --- Type Definitions for Hobbies ---
type IconType = 'football' | 'opensource' | 'anime' | 'f1';

type GlowColor = 'cyan' | 'purple' | 'green' | 'orange';

interface SkillIconProps {
  type: IconType;
}

interface SkillConfig {
  id: string;
  orbitRadius: number;
  size: number;
  speed: number;
  iconType: IconType;
  phaseShift: number;
  glowColor: GlowColor;
  label: string;
}

interface OrbitingSkillProps {
  config: SkillConfig;
  angle: number;
}

interface GlowingOrbitPathProps {
  radius: number;
  glowColor?: GlowColor;
  animationDelay?: number;
}

// --- Icons specific to the hobbies ---
const iconComponents: Record<IconType, { component: () => React.JSX.Element; color: string }> = {
  football: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-white">
        <circle cx="12" cy="12" r="10" />
        <path d="m4.93 4.93 4.24 4.24" />
        <path d="m14.83 9.17 4.24-4.24" />
        <path d="m14.83 14.83 4.24 4.24" />
        <path d="m9.17 14.83-4.24 4.24" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
    color: '#10B981' // emerald
  },
  opensource: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-white">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    ),
    color: '#3B82F6' // blue
  },
  anime: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-white">
        <polygon points="5 3 19 12 5 21 5 3" />
      </svg>
    ),
    color: '#8B5CF6' // violet
  },
  f1: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-white">
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
        <line x1="4" x2="4" y1="22" y2="15" />
      </svg>
    ),
    color: '#EF4444' // red
  }
};

const SkillIcon = memo(({ type }: SkillIconProps) => {
  const IconComponent = iconComponents[type]?.component;
  return IconComponent ? <IconComponent /> : null;
});
SkillIcon.displayName = 'SkillIcon';

// --- Orbiting Hobbies Configuration ---
const skillsConfig: SkillConfig[] = [
  { 
    id: 'football',
    orbitRadius: 100, 
    size: 45, 
    speed: 0.8, 
    iconType: 'football', 
    phaseShift: 0, 
    glowColor: 'green',
    label: 'Football'
  },
  { 
    id: 'anime',
    orbitRadius: 100, 
    size: 45, 
    speed: 0.8, 
    iconType: 'anime', 
    phaseShift: Math.PI, 
    glowColor: 'purple',
    label: 'Anime'
  },
  { 
    id: 'opensource',
    orbitRadius: 180, 
    size: 55, 
    speed: -0.5, 
    iconType: 'opensource', 
    phaseShift: 0, 
    glowColor: 'cyan',
    label: 'Open Source'
  },
  { 
    id: 'f1',
    orbitRadius: 180, 
    size: 55, 
    speed: -0.5, 
    iconType: 'f1', 
    phaseShift: Math.PI, 
    glowColor: 'orange',
    label: 'Formula 1'
  },
];

const OrbitingSkill = memo(({ config, angle }: OrbitingSkillProps) => {
  const { orbitRadius, size, iconType, label } = config;

  const x = Math.cos(angle) * orbitRadius;
  const y = Math.sin(angle) * orbitRadius;

  return (
    <div
      className="absolute top-1/2 left-1/2 transition-all duration-300 ease-out group z-10 hover:z-30"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
      }}
    >
      <div
        className="relative w-full h-full p-2 bg-gray-900/90 backdrop-blur-sm border border-white/10 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shadow-lg group-hover:shadow-2xl group-hover:scale-125"
      >
        <SkillIcon type={iconType} />
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-3 py-1 bg-gray-900 border border-white/10 rounded-md text-xs font-mono text-white whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-xl">
          {label}
        </div>
      </div>
    </div>
  );
});
OrbitingSkill.displayName = 'OrbitingSkill';

const GlowingOrbitPath = memo(({ radius, glowColor = 'cyan', animationDelay = 0 }: GlowingOrbitPathProps) => {
  const glowColors = {
    cyan: { primary: 'rgba(6, 182, 212, 0.4)', secondary: 'rgba(6, 182, 212, 0.1)', border: 'rgba(6, 182, 212, 0.2)' },
    purple: { primary: 'rgba(147, 51, 234, 0.4)', secondary: 'rgba(147, 51, 234, 0.1)', border: 'rgba(147, 51, 234, 0.2)' },
    green: { primary: 'rgba(16, 185, 129, 0.4)', secondary: 'rgba(16, 185, 129, 0.1)', border: 'rgba(16, 185, 129, 0.2)' },
    orange: { primary: 'rgba(249, 115, 22, 0.4)', secondary: 'rgba(249, 115, 22, 0.1)', border: 'rgba(249, 115, 22, 0.2)' }
  };

  const colors = glowColors[glowColor] || glowColors.cyan;

  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
      style={{
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
        animationDelay: `${animationDelay}s`,
      }}
    >
      <div
        className="absolute inset-0 rounded-full animate-pulse opacity-50"
        style={{
          background: `radial-gradient(circle, transparent 30%, ${colors.secondary} 70%, ${colors.primary} 100%)`,
          boxShadow: `0 0 60px ${colors.primary}, inset 0 0 60px ${colors.secondary}`,
          animation: 'pulse 4s ease-in-out infinite',
          animationDelay: `${animationDelay}s`,
        }}
      />
      <div
        className="absolute inset-0 rounded-full"
        style={{
          border: `1px dashed ${colors.border}`,
        }}
      />
    </div>
  );
});
GlowingOrbitPath.displayName = 'GlowingOrbitPath';

export default function OrbitingSkills() {
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      setTime(prevTime => prevTime + deltaTime);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  const orbitConfigs: Array<{ radius: number; glowColor: GlowColor; delay: number }> = [
    { radius: 100, glowColor: 'cyan', delay: 0 },
    { radius: 180, glowColor: 'purple', delay: 1.5 }
  ];

  return (
    <div className="w-full py-20 flex flex-col items-center justify-center overflow-hidden bg-black border-t border-white/10 relative">
      <div className="mb-10 z-20 text-center">
        <h2 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tight">Interests & Hobbies</h2>
        <p className="text-white/50 mt-2 font-mono text-sm">Beyond the terminal.</p>
      </div>

      <div 
        className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] flex items-center justify-center my-10 scale-75 md:scale-100"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="w-24 h-24 bg-zinc-900 border border-white/20 rounded-full flex items-center justify-center z-10 relative shadow-2xl">
          <div className="absolute inset-0 rounded-full bg-sky-500/20 blur-xl animate-pulse"></div>
          <div className="relative z-10 font-black text-2xl tracking-tighter text-white">ME</div>
        </div>

        {orbitConfigs.map((config) => (
          <GlowingOrbitPath
            key={`path-${config.radius}`}
            radius={config.radius}
            glowColor={config.glowColor}
            animationDelay={config.delay}
          />
        ))}

        {skillsConfig.map((config) => {
          const angle = time * config.speed + (config.phaseShift || 0);
          return (
            <OrbitingSkill
              key={config.id}
              config={config}
              angle={angle}
            />
          );
        })}
      </div>
    </div>
  );
}
