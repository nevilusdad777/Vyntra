import React from 'react';

interface LogoProps {
  variant?: 'navbar' | 'auth' | 'custom';
  showIcon?: boolean;
  showWordmark?: boolean;
  iconHeight?: number | string;
  wordmarkHeight?: number | string;
  gap?: number | string;
  className?: string;
}

/** Inline SVG icon mark — a precision geometric "V" within a glowing diamond frame */
const VyntraIconMark = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="vyntra-glow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00d4aa" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#00f0ff" stopOpacity="0.3" />
      </linearGradient>
      <linearGradient id="vyntra-stroke-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#00d4aa" stopOpacity="0.8" />
      </linearGradient>
      <filter id="teal-glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="1.5" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    {/* Subtle Glow Aura */}
    <path
      d="M16 3L29 16L16 29L3 16L16 3Z"
      fill="url(#vyntra-glow-grad)"
      opacity="0.12"
    />

    {/* Diamond outer frame */}
    <path
      d="M16 3L29 16L16 29L3 16L16 3Z"
      fill="none"
      stroke="url(#vyntra-stroke-grad)"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />

    {/* Inner geometric V mark */}
    <path
      d="M9.5 10.5L16 22.5L22.5 10.5"
      stroke="white"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Quantum node dot */}
    <circle cx="16" cy="22.5" r="1.8" fill="#00d4aa" filter="url(#teal-glow)" />
  </svg>
);

/** Inline SVG wordmark — modern high-precision typography */
const VyntraWordmarkSVG = ({ height = 20 }: { height?: number }) => (
  <svg
    height={height}
    viewBox="0 0 120 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'block' }}
  >
    <text
      x="0"
      y="18"
      fontFamily="'Inter', 'Outfit', ui-sans-serif, system-ui, sans-serif"
      fontSize="19"
      fontWeight="700"
      letterSpacing="-0.6"
      fill="white"
    >
      VYNTRA
    </text>
    {/* Micro accent dot */}
    <circle cx="92" cy="16" r="2" fill="#00d4aa" />
  </svg>
);

export const Logo: React.FC<LogoProps> = ({
  variant = 'navbar',
  showIcon,
  showWordmark,
  iconHeight,
  wordmarkHeight,
  gap,
  className = '',
}) => {
  let displayIcon = showIcon;
  let displayWordmark = showWordmark;
  let resolvedIconSize = typeof iconHeight === 'number' ? iconHeight : 26;
  let resolvedWordmarkHeight = typeof wordmarkHeight === 'number' ? wordmarkHeight : 20;
  let resolvedGap = typeof gap === 'number' ? gap : 8;

  if (variant === 'navbar') {
    displayIcon = showIcon ?? true;
    displayWordmark = showWordmark ?? true;
    resolvedIconSize = 24;
    resolvedWordmarkHeight = 18;
    resolvedGap = 8;
  } else if (variant === 'auth') {
    displayIcon = showIcon ?? true;
    displayWordmark = showWordmark ?? true;
    resolvedIconSize = 36;
    resolvedWordmarkHeight = 26;
    resolvedGap = 10;
  } else {
    displayIcon = showIcon ?? true;
    displayWordmark = showWordmark ?? true;
  }

  return (
    <div
      className={`flex items-center select-none ${className}`}
      style={{ gap: `${resolvedGap}px` }}
    >
      {displayIcon && <VyntraIconMark size={resolvedIconSize} />}
      {displayWordmark && <VyntraWordmarkSVG height={resolvedWordmarkHeight} />}
    </div>
  );
};

