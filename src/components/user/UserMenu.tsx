
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import UserProfile from "./UserProfile";
import SettingsDialog from "../settings/SettingsDialog";
import { LogOut, Settings, User, HelpCircle, CreditCard } from "lucide-react";

const UserMenu = () => {
  const { toast } = useToast();
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
  
  // Mock user data - in a real app, this would come from your auth provider
  const userData = {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex&backgroundColor=b6e3f4",
  };

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const handleHelpClick = () => {
    toast({
      title: "Help Center",
      description: "Opening help documentation...",
    });
  };

  const handleBillingClick = () => {
    toast({
      title: "Billing Information",
      description: "Opening billing information...",
    });
  };

  return (
    <>
      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarImage src={userData.avatar} alt={userData.name} />
                <AvatarFallback>
                  <User className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{userData.name}</p>
                <p className="text-xs leading-none text-muted-foreground">{userData.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DialogTrigger asChild>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
            </DialogTrigger>
            <DropdownMenuItem onClick={() => setIsSettingsOpen(true)}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleBillingClick}>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleHelpClick}>
              <HelpCircle className="mr-2 h-4 w-4" />
              <span>Help & Support</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500 focus:text-red-500" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogTrigger className="hidden" />
        
        {/* This is rendered when the dialog is open */}
        <UserProfile className="w-full max-w-2xl mx-auto" />
      </Dialog>
      
      <SettingsDialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen} />
    </>
  );
};

export default UserMenu;
