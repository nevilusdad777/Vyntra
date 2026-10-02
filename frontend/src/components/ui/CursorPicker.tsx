import { useState, useRef, useEffect } from 'react';
import { useCursor, CursorMode } from '@/context/CursorContext';
import { FiCheck, FiChevronDown } from 'react-icons/fi';

export function CursorPicker({ variant = 'compact' }: { variant?: 'compact' | 'expanded' | 'pills' }) {
  const { cursorMode, setCursorMode, cursorOptions } = useCursor();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeOption = cursorOptions.find((opt) => opt.id === cursorMode) || cursorOptions[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (variant === 'pills') {
    return (
      <div className="flex flex-wrap gap-2">
        {cursorOptions.map((opt) => {
          const isActive = opt.id === cursorMode;
          return (
            <button
              key={opt.id}
              onClick={() => setCursorMode(opt.id as CursorMode)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                isActive
                  ? 'bg-[#141414] border-[#2a2a2a] text-white'
                  : 'bg-transparent border-[#1a1a1a] text-[#555] hover:text-[#888] hover:border-[#222]'
              }`}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: opt.accentColor }} />
              <span>{opt.name}</span>
              {isActive && <FiCheck className="text-[#00d4aa]" size={11} />}
            </button>
          );
        })}
      </div>
    );
  }

  if (variant === 'expanded') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {cursorOptions.map((opt) => {
          const isActive = opt.id === cursorMode;
          return (
            <button
              key={opt.id}
              onClick={() => setCursorMode(opt.id as CursorMode)}
              className={`p-4 rounded-xl text-left border transition-all relative group ${
                isActive
                  ? 'bg-[#0f0f0f] border-[#252525]'
                  : 'bg-[#0d0d0d] border-[#161616] hover:border-[#1f1f1f] hover:bg-[#0e0e0e]'
              }`}
            >
              {isActive && (
                <div
                  className="absolute top-0 left-6 right-6 h-px"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(0,212,170,0.45), transparent)' }}
                />
              )}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{
                      backgroundColor: opt.accentColor,
                      boxShadow: isActive ? `0 0 7px ${opt.accentColor}55` : 'none',
                    }}
                  />
                  <h4 className="text-[12px] font-semibold text-white">{opt.name}</h4>
                </div>
                <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-[#111] border border-[#1a1a1a] text-[#444]">
                  {opt.badge}
                </span>
              </div>
              <p className="text-[11px] text-[#444] leading-relaxed">{opt.tagline}</p>
              {isActive && (
                <div className="absolute top-3 right-3 text-[#00d4aa]">
                  <FiCheck size={11} />
                </div>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  // ── compact dropdown ──
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#242424] hover:border-[#333] text-[12px] font-medium text-[#666] hover:text-[#999] transition-colors"
        title="Select Cursor Theme"
      >
        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: activeOption.accentColor }} />
        <span className="hidden sm:inline">Cursor</span>
        <FiChevronDown className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} size={11} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl bg-[#0d0d0d] border border-[#1f1f1f] shadow-[0_8px_40px_rgba(0,0,0,0.8)] p-1.5 z-50">
          <div className="px-3 py-1.5 border-b border-[#141414] mb-1">
            <span className="text-[10px] font-semibold text-[#333] uppercase tracking-widest">Cursor Theme</span>
          </div>
          <div className="space-y-0.5">
            {cursorOptions.map((opt) => {
              const isActive = opt.id === cursorMode;
              return (
                <button
                  key={opt.id}
                  onClick={() => {
                    setCursorMode(opt.id as CursorMode);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-[12px] transition-colors ${
                    isActive
                      ? 'bg-[#141414] text-white font-semibold'
                      : 'text-[#555] hover:bg-[#111] hover:text-[#888]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: opt.accentColor }} />
                    <span>{opt.name}</span>
                  </div>
                  {isActive && <FiCheck className="text-[#00d4aa]" size={11} />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
