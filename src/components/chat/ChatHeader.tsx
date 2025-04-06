
import React from 'react';
import { Bot } from 'lucide-react';
import { CardHeader, CardTitle } from '@/components/ui/card';

const ChatHeader: React.FC = () => {
  return (
    <CardHeader className="px-4 py-3 border-b border-border">
      <CardTitle className="text-lg flex items-center gap-2">
        <BotIcon />
        Live Support Interface
      </CardTitle>
    </CardHeader>
  );
};

const BotIcon = () => (
  <div className="h-6 w-6 rounded-full bg-quantum-cyan/20 flex items-center justify-center">
    <Bot size={14} className="text-quantum-cyan" />
  </div>
);

export default ChatHeader;
