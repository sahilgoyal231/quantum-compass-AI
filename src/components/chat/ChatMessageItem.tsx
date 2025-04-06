
import React from 'react';
import { Bot } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Message } from '@/types/chat';

interface ChatMessageItemProps {
  message: Message;
}

const ChatMessageItem: React.FC<ChatMessageItemProps> = ({ message }) => {
  return (
    <div
      className={cn(
        "flex",
        message.sender === 'user' ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-lg px-4 py-2",
          message.sender === 'user'
            ? "bg-primary text-primary-foreground"
            : "bg-muted"
        )}
      >
        {message.sender === 'agent' && message.agentName && (
          <div className="flex items-center gap-1 mb-1">
            {message.agentAvatar ? (
              <div className="h-5 w-5 rounded-full overflow-hidden">
                <img src={message.agentAvatar} alt={message.agentName} className="h-full w-full object-cover" />
              </div>
            ) : (
              <Bot size={14} />
            )}
            <span className="text-xs font-medium text-quantum-cyan">{message.agentName}</span>
          </div>
        )}
        <p className="text-sm text-wrap-pretty">{message.content}</p>
        <div className="flex justify-end mt-1">
          <span className="text-xs opacity-70">
            {new Intl.DateTimeFormat('en-US', {
              hour: '2-digit',
              minute: '2-digit'
            }).format(message.timestamp)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatMessageItem;
