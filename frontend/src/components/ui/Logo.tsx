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

/** Inline SVG icon mark — a minimal "V" diamond shape */
const VyntraIconMark = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Diamond outer */}
    <path
      d="M16 2L30 16L16 30L2 16L16 2Z"
      fill="none"
      stroke="rgba(255,255,255,0.15)"
      strokeWidth="1"
    />
    {/* Inner V shape */}
    <path
      d="M10 11L16 21L22 11"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Center dot */}
    <circle cx="16" cy="21" r="1.5" fill="#00d4aa" />
  </svg>
);

/** Inline SVG wordmark — clean sans-serif style matching the dark Charter theme */
const VyntraWordmarkSVG = ({ height = 20 }: { height?: number }) => (
  <svg
    height={height}
    viewBox="0 0 110 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'block' }}
  >
    <text
      x="0"
      y="18"
      fontFamily="'Inter', 'Google Sans', ui-sans-serif, sans-serif"
      fontSize="20"
      fontWeight="600"
      letterSpacing="-0.5"
      fill="white"
    >
      Vyntra
    </text>
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
    resolvedIconSize = 22;
    resolvedWordmarkHeight = 18;
    resolvedGap = 7;
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
