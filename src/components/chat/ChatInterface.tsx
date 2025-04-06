
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Message } from "@/types/chat";
import { determineResponseType, formatOrderResponse } from "@/utils/chatUtils";
import ChatHeader from "./ChatHeader";
import ChatMessageList from "./ChatMessageList";
import QuickResponses from "./QuickResponses";
import ChatInputArea from "./ChatInputArea";

interface ChatInterfaceProps {
  className?: string;
}

// Mock data and responses moved to constants
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

const QUICK_RESPONSES = [
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
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (input: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages([...messages, newMessage]);
    
    setIsTyping(true);
    
    const responseType = determineResponseType(input, AI_RESPONSES);
    let responseContent = AI_RESPONSES[responseType];
    
    if (responseType === 'order') {
      responseContent = formatOrderResponse(responseContent);
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
      <ChatHeader />
      <CardContent className="flex-1 p-4 overflow-hidden flex flex-col">
        <ChatMessageList 
          messages={messages} 
          isTyping={isTyping} 
        />
        
        <QuickResponses 
          responses={QUICK_RESPONSES} 
          onSelectResponse={handleQuickResponse} 
        />
        
        <ChatInputArea onSendMessage={handleSendMessage} />
      </CardContent>
    </Card>
  );
};

export default ChatInterface;
