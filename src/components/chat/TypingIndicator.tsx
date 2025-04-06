
import React from 'react';
import { Bot } from 'lucide-react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex justify-start">
      <div className="bg-muted rounded-lg px-4 py-2">
        <div className="flex items-center gap-1">
          <Bot size={14} />
          <span className="text-xs font-medium text-quantum-cyan">Quantum Agent</span>
        </div>
        <div className="flex gap-1 mt-1">
          <div className="w-2 h-2 rounded-full bg-quantum-cyan animate-pulse"></div>
          <div className="w-2 h-2 rounded-full bg-quantum-cyan animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 rounded-full bg-quantum-cyan animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
