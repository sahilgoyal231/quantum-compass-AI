
import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const QuantumLogo: React.FC<LogoProps> = ({ 
  className, 
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12'
  };

  return (
    <div className={cn(
      "relative rounded-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-purple-500 via-cyan-500 to-blue-600",
      sizeClasses[size],
      className
    )}>
      <div className="absolute inset-0.5 rounded-full bg-gradient-to-br from-black/80 to-black/40 flex items-center justify-center">
        <div className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-300 via-purple-300 to-blue-300 font-bold">
          QC
        </div>
        <div className="absolute w-full h-full">
          <div className="absolute w-1.5 h-1.5 rounded-full bg-cyan-300 top-1 left-1/4 animate-pulse" style={{ animationDelay: '0.1s' }}></div>
          <div className="absolute w-1 h-1 rounded-full bg-purple-300 bottom-1.5 right-1.5 animate-pulse" style={{ animationDelay: '0.3s' }}></div>
          <div className="absolute w-1 h-1 rounded-full bg-blue-300 bottom-1 left-1.5 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default QuantumLogo;
