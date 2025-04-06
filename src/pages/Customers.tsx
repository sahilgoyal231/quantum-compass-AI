
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import SideBar from '@/components/SideBar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, MoreHorizontal, ArrowUpDown, ArrowDownAZ, ArrowDownZA, Download, Mail, UserCheck } from 'lucide-react';

// Sample customer data
const CUSTOMERS_DATA = [
  {
    id: '001',
    name: 'Emma Johnson',
    email: 'emma.johnson@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma&backgroundColor=b6e3f4',
    status: 'active',
    dateJoined: '2023-04-12',
    lastInteraction: '2023-10-15',
    lifetime: '$2,450.00',
    tickets: 3,
    satisfaction: 95,
    segment: 'Premium'
  },
  {
    id: '002',
    name: 'James Wilson',
    email: 'james.wilson@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James&backgroundColor=c0aede',
    status: 'active',
    dateJoined: '2023-02-22',
    lastInteraction: '2023-09-30',
    lifetime: '$1,875.50',
    tickets: 1,
    satisfaction: 90,
    segment: 'Standard'
  },
  {
    id: '003',
    name: 'Sophia Martinez',
    email: 'sophia.m@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia&backgroundColor=d1d4f9',
    status: 'inactive',
    dateJoined: '2023-05-04',
    lastInteraction: '2023-07-22',
    lifetime: '$750.25',
    tickets: 4,
    satisfaction: 82,
    segment: 'Standard'
  },
  {
    id: '004',
    name: 'Ethan Brown',
    email: 'ethan.brown@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ethan&backgroundColor=ffceb5',
    status: 'active',
    dateJoined: '2022-11-30',
    lastInteraction: '2023-10-05',
    lifetime: '$3,280.75',
    tickets: 2,
    satisfaction: 98,
    segment: 'Premium'
  },
  {
    id: '005',
    name: 'Olivia Taylor',
    email: 'olivia.t@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia&backgroundColor=d6ffd6',
    status: 'active',
    dateJoined: '2023-01-15',
    lastInteraction: '2023-10-12',
    lifetime: '$1,640.50',
    tickets: 0,
    satisfaction: 100,
    segment: 'Standard'
  },
  {
    id: '006',
    name: 'Aiden Thompson',
    email: 'aiden.t@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aiden&backgroundColor=d6d6ff',
    status: 'active',
    dateJoined: '2023-03-08',
    lastInteraction: '2023-09-28',
    lifetime: '$920.25',
    tickets: 2,
    satisfaction: 88,
    segment: 'Basic'
  },
  {
    id: '007',
    name: 'Isabella Garcia',
    email: 'isabella.g@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Isabella&backgroundColor=ffd6d6',
    status: 'inactive',
    dateJoined: '2022-12-05',
    lastInteraction: '2023-06-20',
    lifetime: '$450.00',
    tickets: 5,
    satisfaction: 75,
    segment: 'Basic'
  }
];

const Customers = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  // Filter customers based on search term and filter
  const filteredCustomers = CUSTOMERS_DATA.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.segment.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = 
      filter === 'all' || 
      (filter === 'active' && customer.status === 'active') || 
      (filter === 'inactive' && customer.status === 'inactive') ||
      (filter === 'premium' && customer.segment === 'Premium');
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div className="flex flex-1">
        <SideBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        
        <main className="flex-1 p-6 lg:ml-64">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold mb-1">Customer Management</h1>
              <p className="text-muted-foreground">View and manage your customer base</p>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              <Button variant="outline" size="sm">
                <Mail className="h-4 w-4 mr-2" />
                Email Campaign
              </Button>
              <Button size="sm">
                <UserCheck className="h-4 w-4 mr-2" />
                Add Customer
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{CUSTOMERS_DATA.length}</div>
                <p className="text-xs text-muted-foreground mt-1">+12% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{CUSTOMERS_DATA.filter(c => c.status === 'active').length}</div>
                <p className="text-xs text-muted-foreground mt-1">+5% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Premium Customers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{CUSTOMERS_DATA.filter(c => c.segment === 'Premium').length}</div>
                <p className="text-xs text-muted-foreground mt-1">+18% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Customer Satisfaction</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round(CUSTOMERS_DATA.reduce((acc, curr) => acc + curr.satisfaction, 0) / CUSTOMERS_DATA.length)}%
                </div>
                <p className="text-xs text-muted-foreground mt-1">+2% from last month</p>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Customers</CardTitle>
              <CardDescription>Manage and monitor your customer database.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search customers..." 
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setFilter('all')}>All Customers</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilter('active')}>Active Customers</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilter('inactive')}>Inactive Customers</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilter('premium')}>Premium Customers</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <ArrowUpDown className="h-4 w-4 mr-2" />
                      Sort
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <ArrowDownAZ className="h-4 w-4 mr-2" />
                      Name (A-Z)
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <ArrowDownZA className="h-4 w-4 mr-2" />
                      Name (Z-A)
                    </DropdownMenuItem>
                    <DropdownMenuItem>Most Recent</DropdownMenuItem>
                    <DropdownMenuItem>Oldest First</DropdownMenuItem>
                    <DropdownMenuItem>Highest Value</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[250px]">Customer</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Last Interaction</TableHead>
                      <TableHead>Lifetime Value</TableHead>
                      <TableHead>Segment</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCustomers.map(customer => (
                      <TableRow key={customer.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={customer.avatar} />
                              <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{customer.name}</div>
                              <div className="text-sm text-muted-foreground">{customer.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={customer.status === 'active' ? "default" : "secondary"}>
                            {customer.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{customer.dateJoined}</TableCell>
                        <TableCell>{customer.lastInteraction}</TableCell>
                        <TableCell>{customer.lifetime}</TableCell>
                        <TableCell>
                          <Badge variant={customer.segment === 'Premium' ? "default" : "outline"}>
                            {customer.segment}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Edit Customer</DropdownMenuItem>
                              <DropdownMenuItem>View Support History</DropdownMenuItem>
                              <DropdownMenuItem>Send Email</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Customers;
