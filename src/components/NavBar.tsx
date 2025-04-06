
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Bell, Settings, User, Menu, Moon, Sun, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import NotificationsPopover from './notifications/NotificationsPopover';
import UserMenu from './user/UserMenu';

interface NavBarProps {
  toggleSidebar: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ toggleSidebar }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  useEffect(() => {
    // Check if there's a saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
      document.documentElement.classList.toggle('light', savedTheme === 'light');
    } else {
      // Default to dark mode
      setIsDarkMode(true);
    }
  }, []);
  
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    document.documentElement.classList.toggle('light', !newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };
  
  return (
    <nav className="w-full h-16 px-6 flex items-center justify-between bg-card/90 backdrop-blur-sm border-b border-border z-10 sticky top-0">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className="lg:hidden text-foreground hover:bg-muted"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2">
          <div className={cn(
            "h-8 w-8 rounded-full bg-quantum-cyan animate-pulse-glow",
            "flex items-center justify-center"
          )}>
            <div className="h-6 w-6 rounded-full bg-quantum-blue flex items-center justify-center">
              <div className="h-3 w-3 rounded-full bg-quantum-bright-cyan"></div>
            </div>
          </div>
          <div className="font-bold text-xl text-foreground">QuantumCS</div>
        </div>
        
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="h-8 px-2 text-xs">Solutions</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {menuItems.map((item) => (
                    <li key={item.title}>
                      <NavigationMenuLink asChild>
                        <a 
                          href={item.href} 
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">{item.title}</div>
                          <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                            {item.description}
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "h-8 px-2 text-xs")} href="/agents">
                Agents
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "h-8 px-2 text-xs")} href="/technologies">
                Technologies
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="flex items-center gap-1">
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-foreground hover:bg-muted"
          onClick={toggleTheme}
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
        
        {/* Notifications Popover */}
        <NotificationsPopover />
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-foreground hover:bg-muted"
          onClick={() => window.open('/help', '_blank')}
        >
          <HelpCircle className="h-5 w-5" />
        </Button>
        
        {/* User Menu */}
        <UserMenu />
      </div>
    </nav>
  );
};

const menuItems = [
  {
    title: "Problem",
    description: "Learn about the customer support challenges we're addressing",
    href: "/problem",
  },
  {
    title: "Solution",
    description: "Discover our innovative approach to support automation",
    href: "/solution",
  },
  {
    title: "Multi-Agent Hub",
    description: "Explore our ecosystem of specialized AI agents",
    href: "/agents",
  },
  {
    title: "Quantum Architecture",
    description: "Understand the technology behind our system",
    href: "/technologies",
  },
  {
    title: "Workflow",
    description: "See how our agents collaborate to resolve issues",
    href: "/workflow",
  },
  {
    title: "Neural Network",
    description: "Visualize our neuromorphic processing capabilities",
    href: "/neural-net",
  },
];

export default NavBar;
