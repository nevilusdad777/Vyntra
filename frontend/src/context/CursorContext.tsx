import React, { createContext, useContext, useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export type CursorMode = 'neon-pulse' | 'cyber-crosshair' | 'magnetic-sphere' | 'emerald-spark' | 'sleek-ring' | 'default';

export interface CursorOption {
  id: CursorMode;
  name: string;
  tagline: string;
  accentColor: string;
  badge: string;
}

export const CURSOR_OPTIONS: CursorOption[] = [
  {
    id: 'neon-pulse',
    name: 'Charter Neon Pulse',
    tagline: 'Glowing cyan-violet aura ring with dynamic expansion',
    accentColor: '#4cd7f6',
    badge: 'Recommended',
  },
  {
    id: 'cyber-crosshair',
    name: 'Cyber Reticle',
    tagline: 'Futuristic HUD target lock crosshair',
    accentColor: '#c4c0ff',
    badge: 'Precision',
  },
  {
    id: 'magnetic-sphere',
    name: 'Glass Orbit',
    tagline: 'Glassmorphic magnetic orb with fluid physics',
    accentColor: '#38bdf8',
    badge: 'Fluid',
  },
  {
    id: 'emerald-spark',
    name: 'Wealth Spark',
    tagline: 'Electric emerald particle glow for high yield tracking',
    accentColor: '#34d399',
    badge: 'Finance',
  },
  {
    id: 'sleek-ring',
    name: 'Minimal Outline',
    tagline: 'Ultra-clean micro ring with backdrop invert',
    accentColor: '#ffffff',
    badge: 'Minimal',
  },
  {
    id: 'default',
    name: 'Default Pointer',
    tagline: 'Standard operating system mouse cursor',
    accentColor: '#94a3b8',
    badge: 'Classic',
  },
];

interface CursorContextType {
  cursorMode: CursorMode;
  setCursorMode: (mode: CursorMode) => void;
  isHovered: boolean;
  isClicked: boolean;
  cursorOptions: CursorOption[];
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'vyntra_cursor_mode';

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [cursorMode, setCursorModeState] = useState<CursorMode>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY) as CursorMode | null;
      if (saved && CURSOR_OPTIONS.some((opt) => opt.id === saved)) {
        return saved;
      }
    } catch {
      // fallback
    }
    return 'neon-pulse';
  });

  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for cursor trailing rings
  const springConfig = { damping: 28, stiffness: 400, mass: 0.5 };
  const trailX = useSpring(mouseX, springConfig);
  const trailY = useSpring(mouseY, springConfig);

  const setCursorMode = (mode: CursorMode) => {
    setCursorModeState(mode);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, mode);
    } catch {
      // safe write
    }
  };

  useEffect(() => {
    if (cursorMode === 'default') {
      document.body.classList.remove('custom-cursor-active');
      return;
    }

    document.body.classList.add('custom-cursor-active');

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Detect hover over interactive elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest('button, a, input, select, textarea, [role="button"], .interactive, .glass-panel')
        );
        setIsHovered(isInteractive);
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [cursorMode, mouseX, mouseY]);

  return (
    <CursorContext.Provider value={{ cursorMode, setCursorMode, isHovered, isClicked, cursorOptions: CURSOR_OPTIONS }}>
      {children}
      {cursorMode !== 'default' && (
        <CustomCursorRenderer
          cursorMode={cursorMode}
          mouseX={mouseX}
          mouseY={mouseY}
          trailX={trailX}
          trailY={trailY}
          isHovered={isHovered}
          isClicked={isClicked}
        />
      )}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  return context;
}

// Global Cursor Element Visualizer
function CustomCursorRenderer({
  cursorMode,
  mouseX,
  mouseY,
  trailX,
  trailY,
  isHovered,
  isClicked,
}: {
  cursorMode: CursorMode;
  mouseX: any;
  mouseY: any;
  trailX: any;
  trailY: any;
  isHovered: boolean;
  isClicked: boolean;
}) {
  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* ── Mode 1: Charter Neon Pulse ── */}
      {cursorMode === 'neon-pulse' && (
        <>
          {/* Outer Trailing Glow Ring */}
          <motion.div
            style={{
              x: trailX,
              y: trailY,
              translateX: '-50%',
              translateY: '-50%',
            }}
            animate={{
              scale: isClicked ? 0.75 : isHovered ? 1.6 : 1,
              opacity: isHovered ? 0.95 : 0.6,
            }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="w-10 h-10 rounded-full border border-[#4cd7f6]/80 bg-[#4cd7f6]/10 backdrop-blur-[2px] shadow-[0_0_25px_rgba(76,215,246,0.6)] flex items-center justify-center"
          >
            <div className="w-2 h-2 rounded-full bg-[#4cd7f6] animate-ping opacity-75" />
          </motion.div>

          {/* Sharp Core Dot */}
          <motion.div
            style={{
              x: mouseX,
              y: mouseY,
              translateX: '-50%',
              translateY: '-50%',
            }}
            animate={{
              scale: isClicked ? 1.4 : isHovered ? 0.6 : 1,
            }}
            className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_12px_#ffffff]"
          />
        </>
      )}

      {/* ── Mode 2: Cyber Crosshair ── */}
      {cursorMode === 'cyber-crosshair' && (
        <>
          <motion.div
            style={{
              x: trailX,
              y: trailY,
              translateX: '-50%',
              translateY: '-50%',
            }}
            animate={{
              rotate: isHovered ? 90 : 0,
              scale: isClicked ? 0.8 : isHovered ? 1.3 : 1,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="w-8 h-8 relative flex items-center justify-center"
          >
            <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-[#c4c0ff]" />
            <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-[#c4c0ff]" />
            <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-[#c4c0ff]" />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-[#c4c0ff]" />
          </motion.div>

          <motion.div
            style={{
              x: mouseX,
              y: mouseY,
              translateX: '-50%',
              translateY: '-50%',
            }}
            className="w-1.5 h-1.5 rounded-full bg-[#c4c0ff] shadow-[0_0_8px_#c4c0ff]"
          />
        </>
      )}

      {/* ── Mode 3: Glass Orbit ── */}
      {cursorMode === 'magnetic-sphere' && (
        <motion.div
          style={{
            x: trailX,
            y: trailY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          animate={{
            scale: isClicked ? 0.7 : isHovered ? 1.5 : 1,
            borderColor: isHovered ? 'rgba(56, 189, 248, 0.8)' : 'rgba(255, 255, 255, 0.3)',
          }}
          className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/40 shadow-[0_0_20px_rgba(56,189,248,0.4)] flex items-center justify-center"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-sky-300 shadow-[0_0_10px_#38bdf8]" />
        </motion.div>
      )}

      {/* ── Mode 4: Wealth Spark (Emerald) ── */}
      {cursorMode === 'emerald-spark' && (
        <>
          <motion.div
            style={{
              x: trailX,
              y: trailY,
              translateX: '-50%',
              translateY: '-50%',
            }}
            animate={{
              scale: isClicked ? 0.8 : isHovered ? 1.4 : 1,
              rotate: isHovered ? 180 : 45,
            }}
            transition={{ type: 'spring', damping: 20 }}
            className="w-8 h-8 rounded-lg border border-emerald-400/70 bg-emerald-500/10 shadow-[0_0_20px_rgba(52,211,153,0.5)] flex items-center justify-center"
          />

          <motion.div
            style={{
              x: mouseX,
              y: mouseY,
              translateX: '-50%',
              translateY: '-50%',
            }}
            className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]"
          />
        </>
      )}

      {/* ── Mode 5: Sleek Minimal ── */}
      {cursorMode === 'sleek-ring' && (
        <>
          <motion.div
            style={{
              x: trailX,
              y: trailY,
              translateX: '-50%',
              translateY: '-50%',
            }}
            animate={{
              scale: isClicked ? 0.6 : isHovered ? 1.4 : 1,
            }}
            className="w-7 h-7 rounded-full border border-white/80 bg-white/5 backdrop-invert-[0.15]"
          />

          <motion.div
            style={{
              x: mouseX,
              y: mouseY,
              translateX: '-50%',
              translateY: '-50%',
            }}
            className="w-1.5 h-1.5 rounded-full bg-white"
          />
        </>
      )}
    </div>
  );
}
