
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Bell, Monitor, Moon, Sun, Shield, Globe, Volume2, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({ open, onOpenChange }) => {
  const { toast } = useToast();
  const [settings, setSettings] = React.useState({
    theme: localStorage.getItem('theme') || "system",
    notifications: {
      emailAlerts: true,
      pushNotifications: true,
      weeklyDigest: false,
      agentUpdates: true,
      soundAlerts: false
    },
    privacy: {
      shareAnalytics: true,
      storeHistory: true,
      enhancedPrivacy: false
    },
    display: {
      fontSize: "medium",
      highContrast: false,
      animationReduced: false,
      language: "english"
    }
  });

  const handleToggle = (category: "notifications" | "privacy" | "display", setting: string, value: boolean) => {
    setSettings({
      ...settings,
      [category]: {
        ...settings[category],
        [setting]: value,
      },
    });
    
    // Apply settings in real-time
    if (category === "display") {
      if (setting === "highContrast") {
        document.documentElement.classList.toggle('high-contrast', value);
      }
      if (setting === "animationReduced") {
        document.documentElement.classList.toggle('reduce-motion', value);
      }
    }
    
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
    
    // Apply theme change immediately
    if (theme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.toggle('light', !prefersDark);
    } else {
      document.documentElement.classList.toggle('light', theme === 'light');
    }
    
    // Save preference
    localStorage.setItem('theme', theme);
    
    toast({
      title: "Theme Updated",
      description: `Theme has been changed to ${theme}.`,
    });
  };

  const handleSelectChange = (category: "display", setting: string, value: string) => {
    setSettings({
      ...settings,
      [category]: {
        ...settings[category],
        [setting]: value,
      },
    });
    
    // Apply font size in real-time
    if (category === "display" && setting === "fontSize") {
      const rootElement = document.documentElement;
      const sizeMap: Record<string, string> = {
        small: '0.875rem',
        medium: '1rem',
        large: '1.125rem',
        "extra-large": '1.25rem'
      };
      
      rootElement.style.setProperty('--base-font-size', sizeMap[value] || '1rem');
    }
    
    // Show confirmation toast
    const settingName = setting
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase());
    
    toast({
      title: `${settingName} Updated`,
      description: `${settingName} has been changed to ${value}.`,
    });
  };

  const resetSettings = () => {
    const defaultSettings = {
      theme: "system",
      notifications: {
        emailAlerts: true,
        pushNotifications: true,
        weeklyDigest: false,
        agentUpdates: true,
        soundAlerts: false
      },
      privacy: {
        shareAnalytics: true,
        storeHistory: true,
        enhancedPrivacy: false
      },
      display: {
        fontSize: "medium",
        highContrast: false,
        animationReduced: false,
        language: "english"
      }
    };
    
    setSettings(defaultSettings);
    
    // Apply default settings
    document.documentElement.classList.remove('light', 'high-contrast', 'reduce-motion');
    document.documentElement.style.removeProperty('--base-font-size');
    localStorage.removeItem('theme');
    
    toast({
      title: "Settings Reset",
      description: "All settings have been restored to their default values.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Customize your workspace preferences
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="appearance" className="mt-4">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="display">Display</TabsTrigger>
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
              <div className="flex items-center justify-between">
                <div className="space-y-0.5 flex items-center gap-2">
                  <Label className="text-base">Sound Alerts</Label>
                  <Volume2 className="h-4 w-4 text-muted-foreground" />
                </div>
                <Switch
                  checked={settings.notifications.soundAlerts}
                  onCheckedChange={(checked) => handleToggle("notifications", "soundAlerts", checked)}
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
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Label className="text-base">Enhanced Privacy Mode</Label>
                    <Shield className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Maximize data protection and minimize tracking
                  </p>
                </div>
                <Switch
                  checked={settings.privacy.enhancedPrivacy}
                  onCheckedChange={(checked) => handleToggle("privacy", "enhancedPrivacy", checked)}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="display" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="fontSize">Font Size</Label>
                <Select 
                  value={settings.display.fontSize}
                  onValueChange={(value) => handleSelectChange("display", "fontSize", value)}
                >
                  <SelectTrigger id="fontSize">
                    <SelectValue placeholder="Select font size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                    <SelectItem value="extra-large">Extra Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">High Contrast Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Enhance visual accessibility
                  </p>
                </div>
                <Switch
                  checked={settings.display.highContrast}
                  onCheckedChange={(checked) => handleToggle("display", "highContrast", checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Reduce Animations</Label>
                  <p className="text-sm text-muted-foreground">
                    Minimize motion for improved accessibility
                  </p>
                </div>
                <Switch
                  checked={settings.display.animationReduced}
                  onCheckedChange={(checked) => handleToggle("display", "animationReduced", checked)}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="language">Language</Label>
                <Select 
                  value={settings.display.language}
                  onValueChange={(value) => handleSelectChange("display", "language", value)}
                >
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="spanish">Spanish</SelectItem>
                    <SelectItem value="french">French</SelectItem>
                    <SelectItem value="german">German</SelectItem>
                    <SelectItem value="japanese">Japanese</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end mt-4">
          <Button variant="outline" onClick={resetSettings}>
            Reset to Defaults
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
