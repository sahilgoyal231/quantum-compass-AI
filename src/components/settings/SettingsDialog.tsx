
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Bell, Monitor, Moon, Sun, Shield, Globe } from "lucide-react";

export interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({ open, onOpenChange }) => {
  const { toast } = useToast();
  const [settings, setSettings] = React.useState({
    theme: "system",
    notifications: {
      emailAlerts: true,
      pushNotifications: true,
      weeklyDigest: false,
      agentUpdates: true,
    },
    privacy: {
      shareAnalytics: true,
      storeHistory: true,
    },
  });

  const handleToggle = (category: "notifications" | "privacy", setting: string, value: boolean) => {
    setSettings({
      ...settings,
      [category]: {
        ...settings[category],
        [setting]: value,
      },
    });
    
    // Show confirmation toast
    const settingName = setting
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase());
    
    toast({
      title: `${settingName} ${value ? "Enabled" : "Disabled"}`,
      description: `You've ${value ? "enabled" : "disabled"} ${settingName.toLowerCase()}.`,
    });
  };

  const handleThemeChange = (theme: string) => {
    setSettings({
      ...settings,
      theme,
    });
    
    toast({
      title: "Theme Updated",
      description: `Theme has been changed to ${theme}.`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Customize your workspace preferences
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="appearance" className="mt-4">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
          </TabsList>
          
          <TabsContent value="appearance" className="space-y-4 mt-4">
            <div>
              <h3 className="text-sm font-medium mb-3">Theme</h3>
              <div className="grid grid-cols-3 gap-2">
                <div 
                  className={`flex flex-col items-center gap-2 p-2 rounded-md cursor-pointer border ${settings.theme === "light" ? "border-primary" : "border-input"}`}
                  onClick={() => handleThemeChange("light")}
                >
                  <div className="h-10 w-10 rounded-full bg-background flex items-center justify-center">
                    <Sun className="h-6 w-6" />
                  </div>
                  <span className="text-xs">Light</span>
                </div>
                <div 
                  className={`flex flex-col items-center gap-2 p-2 rounded-md cursor-pointer border ${settings.theme === "dark" ? "border-primary" : "border-input"}`}
                  onClick={() => handleThemeChange("dark")}
                >
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                    <Moon className="h-6 w-6" />
                  </div>
                  <span className="text-xs">Dark</span>
                </div>
                <div 
                  className={`flex flex-col items-center gap-2 p-2 rounded-md cursor-pointer border ${settings.theme === "system" ? "border-primary" : "border-input"}`}
                  onClick={() => handleThemeChange("system")}
                >
                  <div className="h-10 w-10 rounded-full bg-card flex items-center justify-center">
                    <Monitor className="h-6 w-6" />
                  </div>
                  <span className="text-xs">System</span>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Email Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications via email
                  </p>
                </div>
                <Switch
                  checked={settings.notifications.emailAlerts}
                  onCheckedChange={(checked) => handleToggle("notifications", "emailAlerts", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive in-app notifications
                  </p>
                </div>
                <Switch
                  checked={settings.notifications.pushNotifications}
                  onCheckedChange={(checked) => handleToggle("notifications", "pushNotifications", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Weekly Digest</Label>
                  <p className="text-sm text-muted-foreground">
                    Get a summary of activity weekly
                  </p>
                </div>
                <Switch
                  checked={settings.notifications.weeklyDigest}
                  onCheckedChange={(checked) => handleToggle("notifications", "weeklyDigest", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Agent Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Be notified about agent status changes
                  </p>
                </div>
                <Switch
                  checked={settings.notifications.agentUpdates}
                  onCheckedChange={(checked) => handleToggle("notifications", "agentUpdates", checked)}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="privacy" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Label className="text-base">Share Analytics</Label>
                    <Globe className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Help us improve by sharing usage data
                  </p>
                </div>
                <Switch
                  checked={settings.privacy.shareAnalytics}
                  onCheckedChange={(checked) => handleToggle("privacy", "shareAnalytics", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Label className="text-base">Store Chat History</Label>
                    <Shield className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Save your conversation history
                  </p>
                </div>
                <Switch
                  checked={settings.privacy.storeHistory}
                  onCheckedChange={(checked) => handleToggle("privacy", "storeHistory", checked)}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
