
export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'agent';
  agentName?: string;
  agentAvatar?: string;
  timestamp: Date;
}

export interface BotIcon {
  Bot: React.FC<{ size?: number; className?: string }>;
}
