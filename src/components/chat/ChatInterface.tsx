import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Mic, Bot, User, HelpCircle, PlusCircle, Smile } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

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

const AI_RESPONSES = {
  default: "I've analyzed your query using our quantum processing network. Based on your customer profile and historical data patterns, here's a tailored solution that addresses your specific needs while optimizing for satisfaction metrics.",
  order: "I've located your order in our system. Your package #QC-[ORDER_ID] is currently [STATUS]. Our logistics team has been notified and is prioritizing your shipment. Would you like me to send you real-time updates via your preferred notification method?",
  refund: "I understand you're requesting a refund. I've reviewed your purchase history and eligibility. Based on our quantum analysis of your customer journey, I can offer you these options: [1] Full refund processed within 24 hours, [2] Store credit with a 15% bonus value, or [3] Exchange with expedited shipping. Which would you prefer?",
  technical: "I've identified the technical issue you're experiencing. Our diagnostic agent has analyzed similar patterns across our knowledge base and found that 87% of similar cases were resolved by [SOLUTION]. Would you like me to guide you through the fix, or would you prefer I handle it remotely for you?",
  complaint: "I sincerely apologize for your experience. Our sentiment analysis indicates this has caused you significant frustration. I've escalated this to our CustomerAdvocate agent who has full authority to resolve this issue to your complete satisfaction. While they prepare a comprehensive solution, is there any immediate concern I can address?",
  pricing: "Based on your usage patterns and customer segment, I've run a quantum analysis of our pricing tiers. I can offer you a customized plan that would save you approximately 22% while providing all the features you regularly use, plus additional services that align with your business growth trajectory."
};

const ChatInterface: React.FC<ChatInterfaceProps> = ({ className }) => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const determineResponseType = (userMessage: string): keyof typeof AI_RESPONSES => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('order') || message.includes('shipping') || message.includes('delivery') || message.includes('track')) {
      return 'order';
    } else if (message.includes('refund') || message.includes('money back') || message.includes('cancel')) {
      return 'refund';
    } else if (message.includes('problem') || message.includes('issue') || message.includes('error') || message.includes('not working')) {
      return 'technical';
    } else if (message.includes('unhappy') || message.includes('disappointed') || message.includes('angry') || message.includes('upset')) {
      return 'complaint';
    } else if (message.includes('price') || message.includes('cost') || message.includes('expensive') || message.includes('cheap')) {
      return 'pricing';
    }
    
    return 'default';
  };

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
    
    setIsTyping(true);
    
    const responseType = determineResponseType(input);
    let responseContent = AI_RESPONSES[responseType];
    
    if (responseType === 'order') {
      const orderId = Math.floor(Math.random() * 10000);
      const statuses = ['being processed', 'prepared for shipping', 'waiting for carrier pickup', 'in transit'];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      responseContent = responseContent.replace('[ORDER_ID]', orderId.toString()).replace('[STATUS]', randomStatus);
    }
    
    setTimeout(() => {
      const agentResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: responseContent,
        sender: 'agent',
        agentName: "QuantumSolve",
        agentAvatar: "https://api.dicebear.com/7.x/bottts/svg?seed=quantumsolve&backgroundColor=c0aede&scale=90",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, agentResponse]);
      setIsTyping(false);
      
      toast({
        title: "New message",
        description: "QuantumSolve has responded to your query.",
        duration: 3000,
      });
    }, 2000 + Math.random() * 1000);
  };

  const handleQuickResponse = (response: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content: response,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages([...messages, newMessage]);
    
    setIsTyping(true);
    
    let responseContent = "";
    let agentName = "NeuroNova";
    let agentAvatar = "https://api.dicebear.com/7.x/bottts/svg?seed=neuronova&backgroundColor=b6e3f4&scale=90";
    
    if (response === "Track my order") {
      responseContent = "I can help you track your order. Could you please provide your order number? Alternatively, I can pull up all your recent orders if you'd prefer.";
    } else if (response === "Request a refund") {
      responseContent = "I'd be happy to assist with your refund request. Before we proceed, could you confirm which order you'd like to refund, and the reason for your return? This will help us process your request more efficiently.";
      agentName = "RefundProcessor";
      agentAvatar = "https://api.dicebear.com/7.x/bottts/svg?seed=refund&backgroundColor=ffd6d6&scale=90";
    } else if (response === "Contact human agent") {
      responseContent = "I'll connect you with a human customer support specialist right away. While I prepare the handover, could you briefly describe your issue so they can be ready to assist you? A specialist should be with you in approximately 2 minutes.";
      agentName = "SupportCoordinator";
      agentAvatar = "https://api.dicebear.com/7.x/bottts/svg?seed=human&backgroundColor=d6ffd6&scale=90";
    } else if (response === "My account settings") {
      responseContent = "You can manage your account settings through the profile section. Would you like me to guide you to specific settings such as notification preferences, privacy controls, or payment methods? Or would you like an overview of all available options?";
      agentName = "AccountManager";
      agentAvatar = "https://api.dicebear.com/7.x/bottts/svg?seed=account&backgroundColor=d6d6ff&scale=90";
    }
    
    setTimeout(() => {
      const agentResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: responseContent,
        sender: 'agent',
        agentName: agentName,
        agentAvatar: agentAvatar,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, agentResponse]);
      setIsTyping(false);
    }, 1500);
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
        <div className="flex-1 overflow-y-auto space-y-4 pr-2" ref={messagesContainerRef}>
          <ScrollArea autoScroll={true} className="h-full">
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
            <div ref={messagesEndRef} />
          </ScrollArea>
        </div>
        
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
            <Button 
              variant="outline" 
              size="icon" 
              title="Voice input"
              onClick={() => toast({
                title: "Voice Input",
                description: "Voice recognition activated. Please speak clearly.",
              })}
            >
              <Mic size={18} />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              title="Add attachment"
              onClick={() => toast({
                title: "Attachment",
                description: "File upload functionality enabled.",
              })}
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
              if (e.key === 'Enter') handleSendMessage();
            }}
          />
          <Button onClick={handleSendMessage}>
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
      </CardContent>
    </Card>
  );
};

const BotIcon = () => (
  <div className="h-6 w-6 rounded-full bg-quantum-cyan/20 flex items-center justify-center">
    <Bot size={14} className="text-quantum-cyan" />
  </div>
);

export default ChatInterface;
