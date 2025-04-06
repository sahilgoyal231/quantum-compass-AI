
import React from 'react';
import { Button } from "@/components/ui/button";
import { Bell, Settings, User, Menu } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavBarProps {
  toggleSidebar: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ toggleSidebar }) => {
  return (
    <nav className="w-full h-16 px-6 flex items-center justify-between bg-card/80 backdrop-blur-sm border-b border-border z-10 sticky top-0">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className="lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2">
          <div className={cn(
            "h-8 w-8 rounded-full bg-quantum-cyan animate-pulse-glow",
            "flex items-center justify-center"
          )}>
            <div className="h-6 w-6 rounded-full bg-quantum-blue flex items-center justify-center">
              <div className="h-3 w-3 rounded-full bg-quantum-cyan"></div>
            </div>
          </div>
          <div className="font-bold text-xl">QuantumCS</div>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </nav>
  );
};

export default NavBar;
