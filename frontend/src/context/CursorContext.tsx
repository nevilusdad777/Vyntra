import React, { createContext, useContext, useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export type CursorMode = 'vyntra-single' | 'default';

export interface CursorOption {
  id: CursorMode;
  name: string;
  tagline: string;
  accentColor: string;
  badge: string;
}

export const CURSOR_OPTIONS: CursorOption[] = [
  {
    id: 'vyntra-single',
    name: 'Charter Glass Lens',
    tagline: 'Single unified luxury magnetic pointer with fluid hover morphing',
    accentColor: '#00d4aa',
    badge: 'Signature',
  },
  {
    id: 'default',
    name: 'Default OS Pointer',
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
      if (saved && (saved === 'vyntra-single' || saved === 'default')) {
        return saved;
      }
    } catch {
      // safe fallback
    }
    return 'vyntra-single';
  });

  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Ultra-responsive single-point spring physics
  const springConfig = { damping: 28, stiffness: 450, mass: 0.35 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

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
          target.closest('button, a, input, select, textarea, [role="button"], .interactive, .glass-panel, table tr, label')
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
        <SingleCustomCursor
          smoothX={smoothX}
          smoothY={smoothY}
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

// Single Unified Custom Cursor (Zero detached elements)
function SingleCustomCursor({
  smoothX,
  smoothY,
  isHovered,
  isClicked,
}: {
  smoothX: any;
  smoothY: any;
  isHovered: boolean;
  isClicked: boolean;
}) {
  return (
    <div className="pointer-events-none fixed inset-0 z-[999999] overflow-hidden">
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isClicked ? 16 : isHovered ? 44 : 22,
          height: isClicked ? 16 : isHovered ? 44 : 22,
          opacity: isHovered ? 0.95 : 0.85,
        }}
        transition={{ type: 'spring', damping: 24, stiffness: 420 }}
        className={`rounded-full flex items-center justify-center transition-colors duration-200 ${
          isHovered
            ? 'bg-[#00d4aa]/15 border-2 border-[#00d4aa] backdrop-blur-[3px] shadow-[0_0_25px_rgba(0,212,170,0.75)]'
            : 'bg-[#00d4aa]/20 border border-[#00d4aa]/70 shadow-[0_0_16px_rgba(0,212,170,0.5)]'
        }`}
      >
        {/* Core precision dot */}
        <motion.div
          animate={{
            scale: isClicked ? 1.4 : isHovered ? 0.5 : 1,
          }}
          className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#ffffff]"
        />
      </motion.div>
    </div>
  );
}
