
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Mic, PlusCircle, HelpCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ChatInputAreaProps {
  onSendMessage: (message: string) => void;
}

const ChatInputArea: React.FC<ChatInputAreaProps> = ({ onSendMessage }) => {
  const [input, setInput] = useState('');
  const { toast } = useToast();

  const handleSend = () => {
    if (!input.trim()) return;
    onSendMessage(input);
    setInput('');
  };

  const handleVoiceInput = () => {
    toast({
      title: "Voice Input",
      description: "Voice recognition activated. Please speak clearly.",
    });
  };

  const handleAttachment = () => {
    toast({
      title: "Attachment",
      description: "File upload functionality enabled.",
    });
  };

  return (
    <>
      <div className="flex gap-2">
        <div className="flex gap-1">
          <Button 
            variant="outline" 
            size="icon" 
            title="Voice input"
            onClick={handleVoiceInput}
          >
            <Mic size={18} />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            title="Add attachment"
            onClick={handleAttachment}
          >
            <PlusCircle size={18} />
          </Button>
        </div>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Send a message..."
          className="flex-1"
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleSend();
          }}
        />
        <Button onClick={handleSend}>
          <Send size={18} className="mr-2" />
          Send
        </Button>
      </div>
      
      <div className="flex justify-end mt-2">
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-xs flex items-center gap-1"
          onClick={() => window.open('/help', '_blank')}
        >
          <HelpCircle size={12} />
          Help Center
        </Button>
      </div>
    </>
  );
};

export default ChatInputArea;
