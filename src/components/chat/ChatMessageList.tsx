
import React, { useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import ChatMessageItem from './ChatMessageItem';
import TypingIndicator from './TypingIndicator';
import { Message } from '@/types/chat';

interface ChatMessageListProps {
  messages: Message[];
  isTyping: boolean;
}

const ChatMessageList: React.FC<ChatMessageListProps> = ({ messages, isTyping }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex-1 overflow-y-auto space-y-4 pr-2">
      <ScrollArea autoScroll={true} className="h-full">
        {messages.map((message) => (
          <ChatMessageItem key={message.id} message={message} />
        ))}
        
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </ScrollArea>
    </div>
  );
};

export default ChatMessageList;
