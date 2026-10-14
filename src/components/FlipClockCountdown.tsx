import React, { useEffect, useState } from 'react';

interface FlipDigitProps {
  digit: string;
}

const FlipDigit: React.FC<FlipDigitProps> = ({ digit }) => {
  return (
    <div className="relative w-7 sm:w-8 h-12 sm:h-14 bg-[#232323] rounded-[3px] overflow-hidden flex items-center justify-center shadow-inner border-x border-[#151515]">
      {/* Top half surface */}
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-[#1A1A1A] to-[#282828]" />
      {/* Bottom half surface */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-[#2E2E2E] to-[#1E1E1E]" />

      {/* Digit text */}
      <span className="relative z-10 font-clock font-medium text-2xl sm:text-3xl text-[#F5F5F5] leading-none tracking-tight select-none">
        {digit}
      </span>

      {/* Center mechanical split-flap line & side hinge notches */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1.5px] bg-[#0E0E0E] z-20 flex items-center justify-between">
        <span className="w-1 h-1.5 bg-[#D4D4D4] rounded-r-[1px]" />
        <span className="w-1 h-1.5 bg-[#D4D4D4] rounded-l-[1px]" />
      </div>
    </div>
  );
};

interface FlipGroupProps {
  digits: string[];
  label: string;
}

const FlipGroup: React.FC<FlipGroupProps> = ({ digits, label }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center bg-[#181818] p-[3px] rounded-[4px] border-2 border-white shadow-[0_4px_12px_rgba(0,0,0,0.22)]">
        {digits.map((d, idx) => (
          <FlipDigit key={idx} digit={d} />
        ))}
      </div>
      <span className="mt-2 font-clock text-[11px] sm:text-xs font-semibold tracking-wider text-[#2D2A26] uppercase">
        {label}
      </span>
    </div>
  );
};

const ColonSeparator: React.FC = () => (
  <div className="flex flex-col items-center justify-center gap-2.5 pb-6 px-0.5 sm:px-1" aria-hidden="true">
    <span className="w-1.5 h-1.5 bg-[#3A352F] rounded-[1px]" />
    <span className="w-1.5 h-1.5 bg-[#3A352F] rounded-[1px]" />
  </div>
);

export const FlipClockCountdown: React.FC = () => {
  // Initial state matches 4.1.png: 003 DAYS : 22 HRS : 29 MINS : 57 SECS
  const INITIAL_SECONDS = 3 * 86400 + 22 * 3600 + 29 * 60 + 57;
  const [remainingSeconds, setRemainingSeconds] = useState<number>(INITIAL_SECONDS);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingSeconds((prev) => (prev > 0 ? prev - 1 : INITIAL_SECONDS));
    }, 1000);
    return () => clearInterval(interval);
  }, [INITIAL_SECONDS]);

  const days = Math.floor(remainingSeconds / 86400);
  const hours = Math.floor((remainingSeconds % 86400) / 3600);
  const minutes = Math.floor((remainingSeconds % 3600) / 60);
  const seconds = remainingSeconds % 60;

  const dayDigits = String(days).padStart(3, '0').split('');
  const hourDigits = String(hours).padStart(2, '0').split('');
  const minuteDigits = String(minutes).padStart(2, '0').split('');
  const secondDigits = String(seconds).padStart(2, '0').split('');

  return (
    <div
      className="inline-flex items-center justify-center gap-1 sm:gap-2 px-2 py-2"
      role="timer"
      aria-label={`Hitung mundur acara: ${days} hari, ${hours} jam, ${minutes} menit, ${seconds} detik`}
    >
      <FlipGroup digits={dayDigits} label="DAYS" />
      <ColonSeparator />
      <FlipGroup digits={hourDigits} label="HRS" />
      <ColonSeparator />
      <FlipGroup digits={minuteDigits} label="MINS" />
      <ColonSeparator />
      <FlipGroup digits={secondDigits} label="SECS" />
    </div>
  );
};
