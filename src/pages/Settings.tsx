import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import SideBar from '@/components/SideBar';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { 
  User, 
  Bell, 
  Shield, 
  Database, 
  Palette, 
  CreditCard, 
  Globe, 
  Key, 
  Lock, 
  UserCheck,
  Save,
  AlertTriangle
} from 'lucide-react';

interface ProfileFormValues {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  website: string;
  timezone: string;
}

interface NotificationSettings {
  emailNotifications: boolean;
  chatUpdates: boolean;
  orderUpdates: boolean;
  systemUpdates: boolean;
  marketingEmails: boolean;
}

interface SecuritySettings {
  twoFactorAuth: boolean;
  sessionTimeout: boolean;
  apiAccess: boolean;
  dataEncryption: boolean;
}

const SettingsPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { toast } = useToast();
  
  const profileForm = useForm<ProfileFormValues>({
    defaultValues: {
      firstName: 'Alex',
      lastName: 'Morgan',
      email: 'alex.morgan@quantumcompass.io',
      company: 'Quantum Solutions Inc.',
      website: 'www.quantumsolutions.io',
      timezone: 'America/New_York',
    },
  });

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    chatUpdates: true,
    orderUpdates: true,
    systemUpdates: false,
    marketingEmails: false,
  });

  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    twoFactorAuth: false,
    sessionTimeout: true,
    apiAccess: true,
    dataEncryption: true,
  });

  const [apiKeys, setApiKeys] = useState([
    { id: 'api-1', name: 'Production API Key', key: 'qc_prod_1a2b3c4d5e6f', createdAt: '2023-08-15', lastUsed: '2023-10-12' },
    { id: 'api-2', name: 'Development API Key', key: 'qc_dev_7g8h9i0j1k2l', createdAt: '2023-09-22', lastUsed: '2023-10-10' },
  ]);

  const onProfileSubmit = (data: ProfileFormValues) => {
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    });
  };

  const handleNotificationChange = (key: keyof NotificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    
    toast({
      title: "Notification settings updated",
      description: "Your notification preferences have been saved.",
    });
  };

  const handleSecurityChange = (key: keyof SecuritySettings) => {
    setSecuritySettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    
    toast({
      title: "Security settings updated",
      description: "Your security preferences have been saved.",
    });
  };

  const generateNewApiKey = () => {
    const newKey = {
      id: `api-${apiKeys.length + 1}`,
      name: `API Key ${apiKeys.length + 1}`,
      key: `qc_${Math.random().toString(36).substring(2, 15)}`,
      createdAt: new Date().toISOString().split('T')[0],
      lastUsed: 'Never',
    };
    
    setApiKeys([...apiKeys, newKey]);
    
    toast({
      title: "New API key generated",
      description: "Your new API key has been created successfully.",
    });
  };

  const deleteApiKey = (id: string) => {
    setApiKeys(apiKeys.filter(key => key.id !== id));
    
    toast({
      title: "API key deleted",
      description: "The API key has been removed from your account.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div className="flex flex-1">
        <SideBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        
        <main className="flex-1 p-6 lg:ml-64">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold mb-1">Settings</h1>
              <p className="text-muted-foreground">Manage your account preferences and configurations</p>
            </div>
          </div>
          
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full">
              <TabsTrigger value="profile" className="text-xs md:text-sm">
                <User className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Profile</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="text-xs md:text-sm">
                <Bell className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="text-xs md:text-sm">
                <Shield className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Security</span>
              </TabsTrigger>
              <TabsTrigger value="api" className="text-xs md:text-sm">
                <Key className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">API Keys</span>
              </TabsTrigger>
              <TabsTrigger value="billing" className="text-xs md:text-sm">
                <CreditCard className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Billing</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your account information and preferences.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...profileForm}>
                    <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={profileForm.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input placeholder="First name" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={profileForm.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Last name" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={profileForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input placeholder="Email address" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={profileForm.control}
                          name="company"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Company</FormLabel>
                              <FormControl>
                                <Input placeholder="Company name" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={profileForm.control}
                          name="website"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Website</FormLabel>
                              <FormControl>
                                <Input placeholder="Website URL" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={profileForm.control}
                          name="timezone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Timezone</FormLabel>
                              <FormControl>
                                <Input placeholder="Select timezone" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      <Button type="submit">
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>
                    Configure how and when you receive notifications.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Email Notifications</div>
                        <div className="text-sm text-muted-foreground">
                          Receive notifications via email
                        </div>
                      </div>
                      <Switch 
                        checked={notificationSettings.emailNotifications} 
                        onCheckedChange={() => handleNotificationChange('emailNotifications')} 
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Chat Updates</div>
                        <div className="text-sm text-muted-foreground">
                          Get notified about new messages and chat activities
                        </div>
                      </div>
                      <Switch 
                        checked={notificationSettings.chatUpdates} 
                        onCheckedChange={() => handleNotificationChange('chatUpdates')} 
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Order Updates</div>
                        <div className="text-sm text-muted-foreground">
                          Receive notifications about your orders and shipping
                        </div>
                      </div>
                      <Switch 
                        checked={notificationSettings.orderUpdates} 
                        onCheckedChange={() => handleNotificationChange('orderUpdates')} 
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">System Updates</div>
                        <div className="text-sm text-muted-foreground">
                          Get notified about system maintenance and updates
                        </div>
                      </div>
                      <Switch 
                        checked={notificationSettings.systemUpdates} 
                        onCheckedChange={() => handleNotificationChange('systemUpdates')} 
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Marketing Emails</div>
                        <div className="text-sm text-muted-foreground">
                          Receive promotional emails and newsletters
                        </div>
                      </div>
                      <Switch 
                        checked={notificationSettings.marketingEmails} 
                        onCheckedChange={() => handleNotificationChange('marketingEmails')} 
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Manage your account security and access preferences.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Two-Factor Authentication</div>
                        <div className="text-sm text-muted-foreground">
                          Add an extra layer of security to your account
                        </div>
                      </div>
                      <Switch 
                        checked={securitySettings.twoFactorAuth} 
                        onCheckedChange={() => handleSecurityChange('twoFactorAuth')} 
                      />
                    </div>
                    {securitySettings.twoFactorAuth && (
                      <div className="ml-6 p-3 bg-muted rounded-md">
                        <div className="flex items-center text-sm">
                          <AlertTriangle className="h-4 w-4 mr-2 text-yellow-500" />
                          You'll need to complete the setup process. 
                          <Button variant="link" className="px-2 h-auto">Set up now</Button>
                        </div>
                      </div>
                    )}
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Session Timeout</div>
                        <div className="text-sm text-muted-foreground">
                          Automatically log out after period of inactivity
                        </div>
                      </div>
                      <Switch 
                        checked={securitySettings.sessionTimeout} 
                        onCheckedChange={() => handleSecurityChange('sessionTimeout')} 
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">API Access</div>
                        <div className="text-sm text-muted-foreground">
                          Allow third-party applications to access your data
                        </div>
                      </div>
                      <Switch 
                        checked={securitySettings.apiAccess} 
                        onCheckedChange={() => handleSecurityChange('apiAccess')} 
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Enhanced Data Encryption</div>
                        <div className="text-sm text-muted-foreground">
                          Use military-grade encryption for sensitive data
                        </div>
                      </div>
                      <Switch 
                        checked={securitySettings.dataEncryption} 
                        onCheckedChange={() => handleSecurityChange('dataEncryption')} 
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t">
                    <h3 className="font-medium mb-4">Password Settings</h3>
                    <Button variant="outline">
                      <Lock className="h-4 w-4 mr-2" />
                      Change Password
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="api">
              <Card>
                <CardHeader>
                  <CardTitle>API Keys</CardTitle>
                  <CardDescription>
                    Manage API keys for accessing the Quantum Customer Compass API.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <Button onClick={generateNewApiKey}>
                      <Key className="h-4 w-4 mr-2" />
                      Generate New API Key
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {apiKeys.map((apiKey) => (
                      <div key={apiKey.id} className="p-4 border rounded-md">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
                          <div className="font-medium">{apiKey.name}</div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => {
                              navigator.clipboard.writeText(apiKey.key);
                              toast({
                                title: "Copied to clipboard",
                                description: "API key has been copied to your clipboard.",
                              });
                            }}>
                              Copy
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => deleteApiKey(apiKey.id)}>
                              Delete
                            </Button>
                          </div>
                        </div>
                        <div className="font-mono text-sm bg-muted p-2 rounded mb-2">
                          {apiKey.key}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Created: {apiKey.createdAt} · Last used: {apiKey.lastUsed}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="billing">
              <Card>
                <CardHeader>
                  <CardTitle>Billing Information</CardTitle>
                  <CardDescription>
                    Manage your subscription and payment methods.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="rounded-md border p-4">
                    <div className="font-medium mb-1">Current Plan</div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center">
                          <span className="text-2xl font-bold mr-2">Professional</span>
                          <Badge>Active</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          Billed monthly · Next billing date: November 15, 2023
                        </div>
                      </div>
                      <Button variant="outline">Change Plan</Button>
                    </div>
                  </div>
                  
                  <div>
                    <div className="font-medium mb-4">Payment Methods</div>
                    <div className="space-y-3">
                      <div className="flex items-center p-3 border rounded-md">
                        <div className="h-10 w-14 bg-gradient-to-r from-blue-600 to-indigo-600 rounded mr-3 flex items-center justify-center text-white font-bold text-xs">
                          VISA
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">Visa ending in 4242</div>
                          <div className="text-sm text-muted-foreground">Expires 12/25</div>
                        </div>
                        <div className="ml-auto">
                          <Badge variant="outline">Default</Badge>
                        </div>
                      </div>
                      
                      <Button variant="outline" className="w-full justify-start">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Add Payment Method
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <div className="font-medium mb-4">Billing History</div>
                    <div className="rounded-md border overflow-hidden">
                      <table className="min-w-full divide-y divide-border">
                        <thead className="bg-muted">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                              Date
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                              Amount
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                              Status
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                              Invoice
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-card divide-y divide-border">
                          <tr>
                            <td className="px-4 py-3 text-sm">Oct 15, 2023</td>
                            <td className="px-4 py-3 text-sm">$49.00</td>
                            <td className="px-4 py-3 text-sm">
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Paid</Badge>
                            </td>
                            <td className="px-4 py-3 text-sm text-right">
                              <Button variant="ghost" size="sm">Download</Button>
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 text-sm">Sep 15, 2023</td>
                            <td className="px-4 py-3 text-sm">$49.00</td>
                            <td className="px-4 py-3 text-sm">
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Paid</Badge>
                            </td>
                            <td className="px-4 py-3 text-sm text-right">
                              <Button variant="ghost" size="sm">Download</Button>
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 text-sm">Aug 15, 2023</td>
                            <td className="px-4 py-3 text-sm">$49.00</td>
                            <td className="px-4 py-3 text-sm">
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Paid</Badge>
                            </td>
                            <td className="px-4 py-3 text-sm text-right">
                              <Button variant="ghost" size="sm">Download</Button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;
