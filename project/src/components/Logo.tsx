import React from 'react';

interface LogoProps {
  className?: string;
  iconClassName?: string;
  textClassName?: string;
  taglineClassName?: string;
  variant?: 'horizontal' | 'vertical' | 'icon-only';
}

export const LogoIcon: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Symmetrical Leaves/Wings in Navy Blue */}
      <path
        d="M50 88C42 88 30 72 26 52C22 32 26 18 35 18C43 18 47 32 50 42C53 32 57 18 65 18C74 18 78 32 74 52C70 72 58 88 50 88Z"
        fill="#102A5C"
      />
      {/* Symmetrical Rounded Medical Cross inside */}
      <rect x="47" y="58" width="6" height="16" rx="2" fill="white" />
      <rect x="42" y="63" width="16" height="6" rx="2" fill="white" />
      {/* Teal/Turquoise circle at the top */}
      <circle cx="50" cy="22" r="6" fill="#4EC3C2" />
    </svg>
  );
};

export const Logo: React.FC<LogoProps> = ({ 
  className = "", 
  iconClassName = "", 
  textClassName = "", 
  taglineClassName = "",
  variant = 'horizontal' 
}) => {
  if (variant === 'icon-only') {
    return <LogoIcon className={iconClassName || "w-10 h-10"} />;
  }

  if (variant === 'vertical') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        <LogoIcon className={iconClassName || "w-24 h-24 mb-3"} />
        <span className={`font-bold tracking-tight text-[#102A5C] flex items-center justify-center ${textClassName || "text-5xl"}`}>
          V
          <span className="relative inline-block leading-none">
            ı
            <span className="absolute top-[10%] left-[25%] w-[8px] h-[8px] bg-[#4EC3C2] rounded-full"></span>
          </span>
          ora
        </span>
        <p className={`text-[#102A5C] font-semibold tracking-wider uppercase mt-1.5 ${taglineClassName || "text-sm"}`}>
          Smarter Health Decisions
        </p>
      </div>
    );
  }

  // Horizontal Logo (Default)
  return (
    <div className={`flex items-center ${className}`}>
      <LogoIcon className={iconClassName || "w-10 h-10"} />
      <span className={`ml-2.5 font-bold tracking-tight text-[#102A5C] flex items-center ${textClassName || "text-2xl"}`}>
        V
        <span className="relative inline-block leading-none">
          ı
          <span className="absolute top-[8%] left-[20%] w-[5px] h-[5px] bg-[#4EC3C2] rounded-full"></span>
        </span>
        ora
      </span>
    </div>
  );
};
