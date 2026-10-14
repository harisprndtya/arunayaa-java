import React from 'react';

/**
 * Ornate Javanese/Baroque gold corner filigree matching 3.png ("our LOVE")
 */
export const GoldCornerFiligree: React.FC<{
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}> = ({ position, className = '' }) => {
  const rotationClass =
    position === 'top-left'
      ? ''
      : position === 'top-right'
        ? 'scale-x-[-1]'
        : position === 'bottom-left'
          ? 'scale-y-[-1]'
          : 'scale-[-1]';

  return (
    <svg
      viewBox="0 0 220 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none ${rotationClass} ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="goldGradCorner" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#B3821E" />
          <stop offset="45%" stopColor="#D6AD42" />
          <stop offset="100%" stopColor="#9B6C12" />
        </linearGradient>
      </defs>
      {/* Outer corner frame and lush scrollwork */}
      <path
        d="M0 0 H210 C185 8 170 22 155 24 C135 26 125 10 105 16 C88 21 82 38 64 36 C48 34 42 18 28 28 C18 35 34 48 36 64 C38 82 21 88 16 105 C10 125 26 135 24 155 C22 170 8 185 0 210 Z"
        fill="url(#goldGradCorner)"
        fillOpacity="0.18"
      />
      {/* Primary thick gold filigree vines */}
      <path
        d="M2 2 H195 C175 14 158 28 138 25 C120 22 112 6 95 14 C78 22 76 42 58 40 C42 38 38 22 25 32 C15 40 38 45 40 60 C42 78 22 80 14 96 C6 112 22 120 25 138 C28 158 14 175 2 195 V2 Z"
        stroke="url(#goldGradCorner)"
        strokeWidth="3.5"
        fill="none"
      />
      {/* Inner intricate curls and floral lattice */}
      <path
        d="M0 0 C35 5 65 25 75 55 C45 45 25 35 0 0 Z"
        fill="url(#goldGradCorner)"
        fillOpacity="0.55"
      />
      <path
        d="M12 12 C45 12 78 26 98 48 C118 28 148 16 182 4 M12 12 C12 45 26 78 48 98 C28 118 16 148 4 182"
        stroke="url(#goldGradCorner)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M28 8 C42 26 62 32 82 22 C96 14 114 18 126 30 C138 18 154 12 170 16 M8 28 C26 42 32 62 22 82 C14 96 18 114 30 126 C18 138 12 154 16 170"
        stroke="url(#goldGradCorner)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Delicate spiral volutes */}
      <circle cx="52" cy="52" r="14" stroke="url(#goldGradCorner)" strokeWidth="2.2" />
      <circle cx="52" cy="52" r="6" fill="url(#goldGradCorner)" />
      <circle cx="92" cy="24" r="10" stroke="url(#goldGradCorner)" strokeWidth="2" />
      <circle cx="24" cy="92" r="10" stroke="url(#goldGradCorner)" strokeWidth="2" />
      <circle cx="135" cy="14" r="7" stroke="url(#goldGradCorner)" strokeWidth="1.8" />
      <circle cx="14" cy="135" r="7" stroke="url(#goldGradCorner)" strokeWidth="1.8" />
      {/* Corner rosette cluster */}
      <path
        d="M6 6 L38 18 L26 30 L18 38 Z M22 22 L68 34 L46 46 L34 68 Z"
        fill="url(#goldGradCorner)"
        fillOpacity="0.7"
      />
    </svg>
  );
};

/**
 * Botanical cream-and-gold orchid illustration overlapping the arch border in 4.0.png
 */
export const OrchidBotanicalSpray: React.FC<{
  side: 'left' | 'right';
  className?: string;
}> = ({ side, className = '' }) => {
  const flip = side === 'left' ? 'scale-x-[-1]' : '';
  return (
    <svg
      viewBox="0 0 180 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none ${flip} ${className}`}
      aria-hidden="true"
    >
      {/* Stems & Buds */}
      <path
        d="M165 95 C135 80 95 65 45 42 M130 82 C122 55 112 36 105 22 M175 135 C135 128 92 135 42 158"
        stroke="#B6964B"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="42" cy="40" r="6" fill="#F3E5AB" stroke="#B6964B" strokeWidth="1.5" />
      <circle cx="104" cy="20" r="5" fill="#F3E5AB" stroke="#B6964B" strokeWidth="1.5" />

      {/* Olive/Gold Foliage Leaves */}
      <path
        d="M85 135 C65 138 52 148 45 162 C62 158 75 148 85 135 Z"
        fill="#A48942"
        stroke="#786228"
        strokeWidth="1.2"
      />
      <path
        d="M72 145 C54 155 44 170 42 186 C56 178 66 164 72 145 Z"
        fill="#B69B4C"
        stroke="#786228"
        strokeWidth="1.2"
      />
      <path
        d="M64 162 C52 175 48 192 50 205 C60 194 64 178 64 162 Z"
        fill="#937935"
        stroke="#786228"
        strokeWidth="1.2"
      />

      {/* Upper Right Small Orchid Blossom */}
      <g transform="translate(118, 18)">
        <path
          d="M28 24 C18 6 4 12 8 28 C12 40 24 36 28 24 Z"
          fill="#FDF8EC"
          stroke="#C5A358"
          strokeWidth="1.5"
        />
        <path
          d="M28 24 C38 6 52 12 48 28 C44 40 32 36 28 24 Z"
          fill="#FDF8EC"
          stroke="#C5A358"
          strokeWidth="1.5"
        />
        <path
          d="M28 24 C14 30 12 48 24 50 C32 52 34 36 28 24 Z"
          fill="#F9EEDF"
          stroke="#C5A358"
          strokeWidth="1.5"
        />
        <circle cx="28" cy="28" r="5" fill="#C85A48" />
      </g>

      {/* Center Cream & Gold Orchid Blossom */}
      <g transform="translate(55, 68)">
        <path
          d="M45 36 C25 8 2 18 8 40 C14 56 35 48 45 36 Z"
          fill="#FBF4E2"
          stroke="#B89748"
          strokeWidth="1.8"
        />
        <path
          d="M45 36 C65 8 88 18 82 40 C76 56 55 48 45 36 Z"
          fill="#FBF4E2"
          stroke="#B89748"
          strokeWidth="1.8"
        />
        <path
          d="M45 36 C38 4 52 4 45 36 Z"
          fill="#F6E8C8"
          stroke="#B89748"
          strokeWidth="1.8"
        />
        <path
          d="M45 36 C22 44 18 72 34 76 C44 78 46 54 45 36 Z"
          fill="#FBF4E2"
          stroke="#B89748"
          strokeWidth="1.8"
        />
        <path
          d="M45 36 C68 44 72 72 56 76 C46 78 44 54 45 36 Z"
          fill="#FBF4E2"
          stroke="#B89748"
          strokeWidth="1.8"
        />
        {/* Delicate veins */}
        <path
          d="M45 36 L24 30 M45 36 L66 30 M45 36 L34 60 M45 36 L56 60"
          stroke="#C8A95B"
          strokeWidth="1"
          strokeDasharray="2 2"
        />
        <ellipse cx="45" cy="40" rx="8" ry="6" fill="#A63A3A" />
        <circle cx="45" cy="39" r="3" fill="#F3D078" />
      </g>

      {/* Lower Right Large Orchid Blossom */}
      <g transform="translate(88, 112)">
        <path
          d="M48 42 C24 12 0 22 6 46 C12 64 36 54 48 42 Z"
          fill="#FBF4E2"
          stroke="#B89748"
          strokeWidth="1.8"
        />
        <path
          d="M48 42 C72 12 96 22 90 46 C84 64 60 54 48 42 Z"
          fill="#FBF4E2"
          stroke="#B89748"
          strokeWidth="1.8"
        />
        <path
          d="M48 42 C22 52 16 84 34 88 C46 90 48 62 48 42 Z"
          fill="#FBF4E2"
          stroke="#B89748"
          strokeWidth="1.8"
        />
        <path
          d="M48 42 C74 52 80 84 62 88 C50 90 48 62 48 42 Z"
          fill="#FBF4E2"
          stroke="#B89748"
          strokeWidth="1.8"
        />
        <path
          d="M48 42 L26 36 M48 42 L70 36 M48 42 L36 68 M48 42 L60 68"
          stroke="#C8A95B"
          strokeWidth="1"
          strokeDasharray="2 2"
        />
        <ellipse cx="48" cy="46" rx="9" ry="6.5" fill="#A63A3A" />
        <circle cx="48" cy="45" r="3.2" fill="#F3D078" />
      </g>
    </svg>
  );
};

/**
 * Single Quatrefoil Mandala Tile used in 4.1.png ("save DATE" bottom backdrop)
 */
const MandalaTile: React.FC<{ className?: string }> = ({ className = 'opacity-95' }) => (
  <svg
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-full h-full ${className}`}
    aria-hidden="true"
  >
    {/* Outer scalloped quatrefoil outline */}
    <path
      d="M60 4 C72 4 78 14 84 20 C90 14 100 18 102 28 C110 32 116 42 116 60 C116 78 110 88 102 92 C100 102 90 106 84 100 C78 106 72 116 60 116 C48 116 42 106 36 100 C30 106 20 102 18 92 C10 88 4 78 4 60 C4 42 10 32 18 28 C20 18 30 14 36 20 C42 14 48 4 60 4 Z"
      stroke="#8D6E2A"
      strokeWidth="2"
      fill="#FBF7EE"
      fillOpacity="0.65"
    />
    {/* 4 Diagonal Petals */}
    <path
      d="M60 60 C42 42 32 28 36 24 C40 20 54 30 60 60 Z M60 60 C78 42 88 28 84 24 C80 20 66 30 60 60 Z M60 60 C42 78 32 92 36 96 C40 100 54 90 60 60 Z M60 60 C78 78 88 92 84 96 C80 100 66 90 60 60 Z"
      stroke="#8D6E2A"
      strokeWidth="1.6"
    />
    {/* 4 Cardinal Crown Petals */}
    <path
      d="M60 12 C70 24 70 42 60 60 C50 42 50 24 60 12 Z M60 108 C70 96 70 78 60 60 C50 78 50 96 60 108 Z M12 60 C24 50 42 50 60 60 C42 70 24 70 12 60 Z M108 60 C96 50 78 50 60 60 C78 70 96 70 108 60 Z"
      stroke="#8D6E2A"
      strokeWidth="1.6"
    />
    {/* Decorative dots */}
    <circle cx="60" cy="22" r="1.8" fill="#8D6E2A" />
    <circle cx="60" cy="98" r="1.8" fill="#8D6E2A" />
    <circle cx="22" cy="60" r="1.8" fill="#8D6E2A" />
    <circle cx="98" cy="60" r="1.8" fill="#8D6E2A" />
    <circle cx="32" cy="32" r="2" fill="#8D6E2A" />
    <circle cx="88" cy="32" r="2" fill="#8D6E2A" />
    <circle cx="32" cy="88" r="2" fill="#8D6E2A" />
    <circle cx="88" cy="88" r="2" fill="#8D6E2A" />
  </svg>
);

/**
 * Full Mandala Lace Pattern Backdrop for 4.1.png ("save DATE")
 */
export const MandalaLaceBackdrop: React.FC = () => {
  return (
    <div className="relative w-full select-none pointer-events-none overflow-hidden py-2">
      {/* Row 1: 4 bold mandala tiles across the top */}
      <div className="grid grid-cols-4 gap-0 w-full">
        <MandalaTile className="opacity-95" />
        <MandalaTile className="opacity-95" />
        <MandalaTile className="opacity-95" />
        <MandalaTile className="opacity-95" />
      </div>
      {/* Row 2: Strong outer edges, soft center behind flip clock */}
      <div className="grid grid-cols-4 gap-0 w-full -mt-3">
        <MandalaTile className="opacity-85" />
        <MandalaTile className="opacity-20" />
        <MandalaTile className="opacity-20" />
        <MandalaTile className="opacity-85" />
      </div>
      {/* Row 3: Soft center row, stronger bottom frame */}
      <div className="grid grid-cols-4 gap-0 w-full -mt-3">
        <MandalaTile className="opacity-85" />
        <MandalaTile className="opacity-35" />
        <MandalaTile className="opacity-35" />
        <MandalaTile className="opacity-85" />
      </div>
    </div>
  );
};

/**
 * Geometric Songket Diamond-Lattice Top Border from 6.png ("our LOVE STORY")
 */
export const SongketDiamondBorder: React.FC = () => {
  return (
    <div className="w-full overflow-hidden select-none pointer-events-none" aria-hidden="true">
      <svg
        viewBox="0 0 600 68"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern id="songketPattern" x="0" y="0" width="60" height="68" patternUnits="userSpaceOnUse">
            {/* Upper diamond row */}
            <path
              d="M30 2 L56 28 L30 54 L4 28 Z"
              stroke="#B59B5B"
              strokeWidth="3.5"
              fill="none"
            />
            <path
              d="M30 10 L48 28 L30 46 L12 28 Z"
              stroke="#8B733B"
              strokeWidth="2"
              strokeDasharray="3 2"
              fill="none"
            />
            {/* Center motif inside diamond */}
            <rect x="26" y="24" width="8" height="8" transform="rotate(45 30 28)" fill="#705B2B" />
            <circle cx="30" cy="20" r="1.5" fill="#4A3C1C" />
            <circle cx="30" cy="36" r="1.5" fill="#4A3C1C" />
            <circle cx="22" cy="28" r="1.5" fill="#4A3C1C" />
            <circle cx="38" cy="28" r="1.5" fill="#4A3C1C" />

            {/* Interlocking side half-diamonds */}
            <path
              d="M0 -2 L26 24 L0 50 L-26 24 Z M60 -2 L86 24 L60 50 L34 24 Z"
              stroke="#C4AD74"
              strokeWidth="3"
              fill="none"
            />
            {/* Lower pendant diamond tip */}
            <path
              d="M15 43 L30 58 L45 43"
              stroke="#B59B5B"
              strokeWidth="3"
              fill="none"
            />
            <path
              d="M22 48 L30 56 L38 48"
              stroke="#6B5627"
              strokeWidth="2"
              fill="none"
            />
          </pattern>
        </defs>
        <rect x="0" y="0" width="600" height="68" fill="url(#songketPattern)" />
      </svg>
    </div>
  );
};

/**
 * Gold divider under "Wedding Gift" in 5.png
 */
export const WeddingGiftDivider: React.FC = () => (
  <div className="flex items-center justify-center gap-2 my-3 w-full max-w-[320px] mx-auto" aria-hidden="true">
    <div className="flex items-center gap-1">
      <span className="w-1.5 h-1.5 rounded-full bg-[#D99B1E]" />
      <span className="w-1 h-1 rounded-full bg-[#D99B1E]" />
      <span className="w-0.5 h-0.5 rounded-full bg-[#D99B1E]" />
    </div>
    <div className="h-[1px] flex-1 bg-gradient-to-r from-[#D99B1E] to-[#C59B38]" />
    <div className="flex items-center gap-2 text-[#C59B38] px-1">
      <span className="text-[10px]">✦</span>
      <span className="text-sm leading-none">✦</span>
      <span className="text-[10px]">✦</span>
    </div>
    <div className="h-[1px] flex-1 bg-gradient-to-l from-[#D99B1E] to-[#C59B38]" />
    <div className="flex items-center gap-1">
      <span className="w-0.5 h-0.5 rounded-full bg-[#D99B1E]" />
      <span className="w-1 h-1 rounded-full bg-[#D99B1E]" />
      <span className="w-1.5 h-1.5 rounded-full bg-[#D99B1E]" />
    </div>
  </div>
);

/**
 * Authentic BCA Bank Logo from 5.png
 */
export const BcaLogo: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`inline-flex items-center gap-2 select-none ${className}`} aria-label="BCA">
    <svg viewBox="0 0 44 44" className="w-8 h-8 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="22" cy="22" r="20" stroke="#005BAA" strokeWidth="2.2" fill="white" />
      <circle cx="22" cy="22" r="17" stroke="#005BAA" strokeWidth="0.8" />
      {/* Stylized lotus petals */}
      <path
        d="M22 8 C17 14 17 22 22 28 C27 22 27 14 22 8 Z"
        fill="#005BAA"
      />
      <path
        d="M15 13 C12 18 14 25 20 28 C18 22 17 17 15 13 Z"
        fill="#005BAA"
      />
      <path
        d="M29 13 C32 18 30 25 24 28 C26 22 27 17 29 13 Z"
        fill="#005BAA"
      />
      <path
        d="M11 21 C11 26 15 30 21 30 C17 27 14 24 11 21 Z"
        fill="#005BAA"
      />
      <path
        d="M33 21 C33 26 29 30 23 30 C27 27 30 24 33 21 Z"
        fill="#005BAA"
      />
      <text
        x="22"
        y="36"
        textAnchor="middle"
        fill="#005BAA"
        fontSize="4.2"
        fontWeight="700"
        fontFamily="sans-serif"
      >
        GRUP BCA
      </text>
    </svg>
    <span className="font-sans font-black italic text-2xl md:text-3xl tracking-tighter text-[#005BAA]">
      BCA
    </span>
  </div>
);
