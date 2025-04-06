
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Mic, Bot, User, HelpCircle, PlusCircle, Smile } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'agent';
  agentName?: string;
  agentAvatar?: string;
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
    agentAvatar: "https://api.dicebear.com/7.x/bottts/svg?seed=neuronova&backgroundColor=b6e3f4&scale=90",
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
    agentAvatar: "https://api.dicebear.com/7.x/bottts/svg?seed=neuronova&backgroundColor=b6e3f4&scale=90",
    timestamp: new Date(Date.now() - 1000 * 60 * 3.5)
  },
  {
    id: '4',
    content: "I'm LogisticsSolver-7, analyzing your shipping concern. I've reprioritized your order and allocated stock from our alternate facility. Your package will ship within 24 hours with expedited delivery at no additional cost.",
    sender: 'agent',
    agentName: "LogisticsSolver-7",
    agentAvatar: "https://api.dicebear.com/7.x/bottts/svg?seed=logistics&backgroundColor=d1d4f9&scale=90",
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
    agentAvatar: "https://api.dicebear.com/7.x/bottts/svg?seed=notification&backgroundColor=ffceb5&scale=90",
    timestamp: new Date(Date.now() - 1000 * 60 * 1)
  }
];

const quickResponses = [
  "Track my order",
  "Request a refund",
  "Contact human agent",
  "My account settings"
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
        agentAvatar: "https://api.dicebear.com/7.x/bottts/svg?seed=quantumsolve&backgroundColor=c0aede&scale=90",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, agentResponse]);
      setIsTyping(false);
    }, 3000);
  };

  const handleQuickResponse = (response: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content: response,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages([...messages, newMessage]);
    
    // Simulate agent typing
    setIsTyping(true);
    
    // Simulate agent response
    setTimeout(() => {
      const agentResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: `I'll help you with "${response}". Let me pull up the relevant information...`,
        sender: 'agent',
        agentName: "NeuroNova",
        agentAvatar: "https://api.dicebear.com/7.x/bottts/svg?seed=neuronova&backgroundColor=b6e3f4&scale=90",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, agentResponse]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <Card className={cn("flex flex-col h-full quantum-panel", className)}>
      <CardHeader className="px-4 py-3 border-b border-border">
        <CardTitle className="text-lg flex items-center gap-2">
          <BotIcon />
          Live Support Interface
        </CardTitle>
      </CardHeader>
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
        
        {/* Quick responses */}
        <div className="flex flex-wrap gap-2 mt-4 mb-2">
          {quickResponses.map((response) => (
            <Button 
              key={response} 
              variant="outline" 
              size="sm" 
              className="text-xs"
              onClick={() => handleQuickResponse(response)}
            >
              {response}
            </Button>
          ))}
        </div>
        
        <div className="flex gap-2">
          <div className="flex gap-1">
            <Button variant="outline" size="icon" title="Voice input">
              <Mic size={18} />
            </Button>
            <Button variant="outline" size="icon" title="Add attachment">
              <PlusCircle size={18} />
            </Button>
          </div>
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
        
        <div className="flex justify-end mt-2">
          <Button variant="ghost" size="sm" className="text-xs flex items-center gap-1">
            <HelpCircle size={12} />
            Help Center
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Helper component for consistent bot icon
const BotIcon = () => (
  <div className="h-6 w-6 rounded-full bg-quantum-cyan/20 flex items-center justify-center">
    <Bot size={14} className="text-quantum-cyan" />
  </div>
);

export default ChatInterface;
