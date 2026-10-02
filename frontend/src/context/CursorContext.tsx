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
    name: 'Charter Quantum Pulse',
    tagline: 'Glowing emerald-teal aura ring with dynamic magnetic snap',
    accentColor: '#00d4aa',
    badge: 'Recommended',
  },
  {
    id: 'cyber-crosshair',
    name: 'Quantum Reticle',
    tagline: 'Precision HUD target lock crosshair with corner brackets',
    accentColor: '#00f0ff',
    badge: 'Precision',
  },
  {
    id: 'magnetic-sphere',
    name: 'Glass Orb',
    tagline: 'Glassmorphic frosted sphere with liquid spring dynamics',
    accentColor: '#ffffff',
    badge: 'Fluid',
  },
  {
    id: 'emerald-spark',
    name: 'High-Yield Diamond',
    tagline: 'Emerald diamond reticle with rotating particle aura',
    accentColor: '#34d399',
    badge: 'Finance',
  },
  {
    id: 'sleek-ring',
    name: 'Minimal Invert Ring',
    tagline: 'Ultra-clean 1px backdrop-invert micro ring',
    accentColor: '#e2e8f0',
    badge: 'Minimal',
  },
  {
    id: 'default',
    name: 'Default Pointer',
    tagline: 'Standard operating system mouse cursor',
    accentColor: '#64748b',
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

  // High-precision smooth springs for cursor trailing rings
  const springConfig = { damping: 26, stiffness: 420, mass: 0.4 };
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
          target.closest('button, a, input, select, textarea, [role="button"], .interactive, .glass-panel, table tr')
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

// Global Custom Cursor Renderer
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
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden">
      {/* ── Mode 1: Charter Quantum Pulse (Recommended) ── */}
      {cursorMode === 'neon-pulse' && (
        <>
          {/* Outer Trailing Glowing Ring */}
          <motion.div
            style={{
              x: trailX,
              y: trailY,
              translateX: '-50%',
              translateY: '-50%',
            }}
            animate={{
              scale: isClicked ? 0.7 : isHovered ? 1.75 : 1,
              opacity: isHovered ? 1 : 0.75,
              borderColor: isHovered ? 'rgba(0, 212, 170, 0.9)' : 'rgba(0, 212, 170, 0.45)',
            }}
            transition={{ type: 'spring', damping: 22, stiffness: 380 }}
            className="w-10 h-10 rounded-full border border-[#00d4aa]/60 bg-[#00d4aa]/10 backdrop-blur-[2px] shadow-[0_0_28px_rgba(0,212,170,0.5)] flex items-center justify-center relative"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-[#00d4aa] opacity-40 animate-ping" />
          </motion.div>

          {/* Core Sharp Pointer Dot */}
          <motion.div
            style={{
              x: mouseX,
              y: mouseY,
              translateX: '-50%',
              translateY: '-50%',
            }}
            animate={{
              scale: isClicked ? 1.5 : isHovered ? 0.7 : 1,
            }}
            className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_12px_#ffffff]"
          />
        </>
      )}

      {/* ── Mode 2: Quantum Reticle (HUD Crosshair) ── */}
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
              scale: isClicked ? 0.8 : isHovered ? 1.35 : 1,
            }}
            transition={{ type: 'spring', stiffness: 320, damping: 22 }}
            className="w-9 h-9 relative flex items-center justify-center"
          >
            {/* Brackets */}
            <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-[#00f0ff] shadow-[0_0_8px_#00f0ff]" />
            <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-[#00f0ff] shadow-[0_0_8px_#00f0ff]" />
            <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-[#00f0ff] shadow-[0_0_8px_#00f0ff]" />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-[#00f0ff] shadow-[0_0_8px_#00f0ff]" />
          </motion.div>

          <motion.div
            style={{
              x: mouseX,
              y: mouseY,
              translateX: '-50%',
              translateY: '-50%',
            }}
            className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] shadow-[0_0_10px_#00f0ff]"
          />
        </>
      )}

      {/* ── Mode 3: Glass Orb (Frosted Fluid) ── */}
      {cursorMode === 'magnetic-sphere' && (
        <motion.div
          style={{
            x: trailX,
            y: trailY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          animate={{
            scale: isClicked ? 0.75 : isHovered ? 1.6 : 1,
            borderColor: isHovered ? 'rgba(255, 255, 255, 0.7)' : 'rgba(255, 255, 255, 0.25)',
          }}
          className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/40 shadow-[0_0_24px_rgba(255,255,255,0.25)] flex items-center justify-center relative overflow-hidden"
        >
          <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#ffffff]" />
          <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent opacity-60" />
        </motion.div>
      )}

      {/* ── Mode 4: High-Yield Diamond ── */}
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
              scale: isClicked ? 0.75 : isHovered ? 1.5 : 1,
              rotate: isHovered ? 135 : 45,
            }}
            transition={{ type: 'spring', damping: 20 }}
            className="w-8 h-8 border border-emerald-400/80 bg-emerald-500/10 shadow-[0_0_24px_rgba(52,211,153,0.5)] flex items-center justify-center relative"
          />

          <motion.div
            style={{
              x: mouseX,
              y: mouseY,
              translateX: '-50%',
              translateY: '-50%',
            }}
            className="w-2 h-2 rounded-full bg-emerald-300 shadow-[0_0_10px_#34d399]"
          />
        </>
      )}

      {/* ── Mode 5: Minimal Invert Ring ── */}
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
              scale: isClicked ? 0.6 : isHovered ? 1.5 : 1,
            }}
            className="w-8 h-8 rounded-full border border-white/80 bg-white/5 backdrop-invert-[0.25]"
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
