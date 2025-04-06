
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, Briefcase, MapPin } from "lucide-react";

export interface UserProfileProps {
  className?: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ className }) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = React.useState(false);
  
  // Mock user data - in a real app, this would come from your auth provider
  const [userData, setUserData] = React.useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    role: "Product Manager",
    location: "San Francisco, CA",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex&backgroundColor=b6e3f4",
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
    });
  };

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>User Profile</CardTitle>
          <Button 
            variant="outline" 
            onClick={() => setIsEditing(!isEditing)}
            size="sm"
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
        </div>
        <CardDescription>
          Manage your personal information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-24 w-24 border-2 border-border">
              <AvatarImage src={userData.avatar} alt={userData.name} />
              <AvatarFallback>
                <User className="h-12 w-12 text-muted-foreground" />
              </AvatarFallback>
            </Avatar>
            {!isEditing && (
              <div className="text-center">
                <h3 className="font-medium text-lg">{userData.name}</h3>
                <p className="text-sm text-muted-foreground">{userData.role}</p>
              </div>
            )}
          </div>

          <div className="flex-1">
            {isEditing ? (
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      value={userData.name}
                      onChange={(e) => setUserData({...userData, name: e.target.value})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={userData.email}
                      onChange={(e) => setUserData({...userData, email: e.target.value})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="role">Job Title</Label>
                    <Input 
                      id="role" 
                      value={userData.role}
                      onChange={(e) => setUserData({...userData, role: e.target.value})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="location">Location</Label>
                    <Input 
                      id="location" 
                      value={userData.location}
                      onChange={(e) => setUserData({...userData, location: e.target.value})}
                    />
                  </div>
                  <Button type="submit" className="w-full">Save Changes</Button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm">{userData.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm">{userData.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm">{userData.role}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm">{userData.location}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
