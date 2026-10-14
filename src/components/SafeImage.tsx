import React, { useState } from 'react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  onClick?: () => void;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  onClick,
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#2B1F16] via-[#3D2C1E] to-[#1A130D] text-[#E6C77B] p-6 text-center select-none ${containerClassName} ${className}`}
      >
        <span className="font-script text-3xl mb-1">Dinda &amp; Gusti</span>
        <span className="font-serif-editorial text-xs tracking-widest uppercase opacity-80">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden ${onClick ? 'cursor-pointer group' : ''} ${containerClassName}`}
      onClick={onClick}
    >
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
        className={`block w-full h-full object-cover transition-transform duration-300 ${
          onClick ? 'group-hover:scale-[1.02]' : ''
        } ${className}`}
      />
    </div>
  );
};
