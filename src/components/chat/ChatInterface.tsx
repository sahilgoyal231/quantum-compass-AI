
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Mic, Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'agent';
  agentName?: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  className?: string;
}

const MOCK_MESSAGES: Message[] = [
  {
    id: '1',
    content: "Hello! How can our quantum agent network assist you today?",
    sender: 'agent',
    agentName: "NeuroNova",
    timestamp: new Date(Date.now() - 1000 * 60 * 5)
  },
  {
    id: '2',
    content: "I'm having trouble with my recent order #QC-7890. It hasn't shipped yet.",
    sender: 'user',
    timestamp: new Date(Date.now() - 1000 * 60 * 4)
  },
  {
    id: '3',
    content: "I've identified your order in our system. There appears to be a shipping delay due to inventory constraints at our regional warehouse. Let me escalate this to our logistics specialist.",
    sender: 'agent',
    agentName: "NeuroNova",
    timestamp: new Date(Date.now() - 1000 * 60 * 3.5)
  },
  {
    id: '4',
    content: "I'm LogisticsSolver-7, analyzing your shipping concern. I've reprioritized your order and allocated stock from our alternate facility. Your package will ship within 24 hours with expedited delivery at no additional cost.",
    sender: 'agent',
    agentName: "LogisticsSolver-7",
    timestamp: new Date(Date.now() - 1000 * 60 * 3)
  },
  {
    id: '5',
    content: "That's great! Will I receive a notification when it ships?",
    sender: 'user',
    timestamp: new Date(Date.now() - 1000 * 60 * 2)
  },
  {
    id: '6',
    content: "Yes, you will receive both an email and SMS notification when your package ships. I've already updated your preferences to include detailed tracking information. Additionally, would you like me to create a proactive alert that will notify you of any potential delays in future orders?",
    sender: 'agent',
    agentName: "NotificationEngine",
    timestamp: new Date(Date.now() - 1000 * 60 * 1)
  }
];

const ChatInterface: React.FC<ChatInterfaceProps> = ({ className }) => {
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages([...messages, newMessage]);
    setInput("");
    
    // Simulate agent typing
    setIsTyping(true);
    
    // Simulate agent response
    setTimeout(() => {
      const agentResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "I've analyzed your query using our quantum processing network. Based on your customer profile and historical data patterns, here's a tailored solution that addresses your specific needs while optimizing for satisfaction metrics.",
        sender: 'agent',
        agentName: "QuantumSolve",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, agentResponse]);
      setIsTyping(false);
    }, 3000);
  };

  return (
    <Card className={cn("flex flex-col h-full quantum-panel", className)}>
      <CardContent className="flex-1 p-4 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map((message) => (
            <div
              key={message.id}
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
                    <Bot size={14} />
                    <span className="text-xs font-medium text-quantum-cyan">{message.agentName}</span>
                  </div>
                )}
                <p className="text-sm">{message.content}</p>
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
          ))}
          
          {isTyping && (
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
          )}
        </div>
        
        <div className="mt-4 flex gap-2">
          <Button variant="outline" size="icon">
            <Mic size={18} />
          </Button>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Send a message..."
            className="flex-1"
            onKeyPress={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
          />
          <Button onClick={handleSendMessage}>
            <Send size={18} className="mr-2" />
            Send
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatInterface;
