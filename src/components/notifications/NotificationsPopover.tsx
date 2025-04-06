
import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Bell, Check, Trash2, User, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useToast } from "@/hooks/use-toast";

export interface Notification {
  id: string;
  type: "message" | "mention" | "alert" | "update";
  title: string;
  description: string;
  time: string; // ISO string format
  read: boolean;
}

export interface NotificationsPopoverProps {
  initialNotifications?: Notification[];
  className?: string;
}

const NotificationsPopover: React.FC<NotificationsPopoverProps> = ({
  initialNotifications,
  className,
}) => {
  const { toast } = useToast();
  const [filter, setFilter] = useState<string>("all");
  
  // Sample notifications - in a real app, these would come from an API
  const [notifications, setNotifications] = useState<Notification[]>(
    initialNotifications || [
      {
        id: "1",
        type: "message",
        title: "New Message",
        description: "NeuroNova: Customer inquiry about subscription",
        time: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
        read: false,
      },
      {
        id: "2",
        type: "alert",
        title: "System Alert",
        description: "QuantumSolve detected unusual activity",
        time: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
        read: false,
      },
      {
        id: "3",
        type: "update",
        title: "Agent Update",
        description: "LogisticsSolver-7 is now online and ready",
        time: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
        read: true,
      },
      {
        id: "4",
        type: "mention",
        title: "You were mentioned",
        description: "In 'Tech Support Team' by QuantumSolve",
        time: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
        read: true,
      },
    ]
  );

  const unreadCount = notifications.filter(n => !n.read).length;

  const filteredNotifications = notifications.filter(notification => {
    if (filter === "all") return true;
    if (filter === "unread") return !notification.read;
    return notification.type === filter;
  });

  const handleMarkAsRead = (id: string) => {
    setNotifications(
      notifications.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
    
    toast({
      title: "Notification marked as read",
      description: "The notification has been marked as read.",
    });
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
    
    toast({
      title: "Notification deleted",
      description: "The notification has been removed.",
    });
  };

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map(notification => ({ ...notification, read: true }))
    );
    
    toast({
      title: "All notifications marked as read",
      description: "All notifications have been marked as read.",
    });
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    
    let interval = seconds / 31536000; // years
    
    if (interval > 1) return Math.floor(interval) + "y ago";
    interval = seconds / 2592000; // months
    if (interval > 1) return Math.floor(interval) + "mo ago";
    interval = seconds / 86400; // days
    if (interval > 1) return Math.floor(interval) + "d ago";
    interval = seconds / 3600; // hours
    if (interval > 1) return Math.floor(interval) + "h ago";
    interval = seconds / 60; // minutes
    if (interval > 1) return Math.floor(interval) + "m ago";
    return Math.floor(seconds) + "s ago";
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "message":
        return <MessageCircle className="h-4 w-4 text-blue-500" />;
      case "mention":
        return <User className="h-4 w-4 text-purple-500" />;
      case "alert":
        return <Bell className="h-4 w-4 text-red-500" />;
      case "update":
        return <Bell className="h-4 w-4 text-green-500" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className={cn("relative", className)}>
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={handleMarkAllAsRead}>
              <Check className="mr-1 h-3 w-3" />
              Mark all as read
            </Button>
          )}
        </div>
        
        <ToggleGroup type="single" value={filter} onValueChange={(value) => value && setFilter(value)} className="mb-3 justify-start">
          <ToggleGroupItem value="all" size="sm" className="text-xs">All</ToggleGroupItem>
          <ToggleGroupItem value="unread" size="sm" className="text-xs">Unread</ToggleGroupItem>
          <ToggleGroupItem value="alert" size="sm" className="text-xs">Alerts</ToggleGroupItem>
          <ToggleGroupItem value="message" size="sm" className="text-xs">Messages</ToggleGroupItem>
        </ToggleGroup>
        
        <div className="max-h-[300px] overflow-y-auto space-y-2">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  "p-2 rounded-md text-sm flex items-start gap-2",
                  !notification.read ? "bg-muted" : "hover:bg-muted/50"
                )}
              >
                <div className="mt-1">{getNotificationIcon(notification.type)}</div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-baseline justify-between">
                    <p className="font-medium text-xs">{notification.title}</p>
                    <span className="text-xs text-muted-foreground">
                      {formatTimeAgo(notification.time)}
                    </span>
                  </div>
                  <p className="text-xs">{notification.description}</p>
                </div>
                <div className="flex flex-col gap-1">
                  {!notification.read && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5"
                      onClick={() => handleMarkAsRead(notification.id)}
                    >
                      <Check className="h-3 w-3" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 text-muted-foreground hover:text-destructive"
                    onClick={() => handleDeleteNotification(notification.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6">
              <p className="text-sm text-muted-foreground">No notifications to show</p>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationsPopover;
