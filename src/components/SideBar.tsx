
import { cn } from "@/lib/utils";
import { 
  Home, 
  Users, 
  MessageSquare, 
  BarChart2, 
  Settings, 
  Database, 
  Network, 
  Bot, 
  BrainCircuit
} from "lucide-react";
import { NavLink } from "react-router-dom";

interface SideBarProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const menuItems = [
  { icon: Home, text: "Dashboard", path: "/" },
  { icon: Users, text: "Customers", path: "/customers" },
  { icon: Bot, text: "Agents", path: "/agents" },
  { icon: MessageSquare, text: "Chat", path: "/chat" },
  { icon: BarChart2, text: "Analytics", path: "/analytics" },
  { icon: BrainCircuit, text: "Neural Net", path: "/neural-net" },
  { icon: Network, text: "Multi-Agent Hub", path: "/agent-hub" },
  { icon: Database, text: "Knowledge Base", path: "/knowledge" },
  { icon: Settings, text: "Settings", path: "/settings" },
];

const SideBar: React.FC<SideBarProps> = ({ isOpen, setIsOpen }) => {
  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden" 
          onClick={() => setIsOpen(false)}
        />
      )}
      
      <aside 
        className={cn(
          "fixed top-0 bottom-0 left-0 z-30",
          "w-64 bg-sidebar transition-transform duration-300 ease-in-out",
          "border-r border-border flex flex-col",
          "lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-16 flex items-center px-6 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-quantum-cyan animate-pulse-glow flex items-center justify-center">
              <div className="h-6 w-6 rounded-full bg-quantum-blue flex items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-quantum-cyan"></div>
              </div>
            </div>
            <div className="font-bold text-xl">QuantumCS</div>
          </div>
        </div>

        <div className="flex-1 py-6 overflow-auto">
          <ul className="space-y-1 px-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => cn(
                    "flex items-center gap-3 px-4 py-2.5 rounded-md transition-colors",
                    "hover:bg-muted",
                    isActive 
                      ? "bg-muted text-quantum-cyan" 
                      : "text-muted-foreground"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon size={18} />
                  <span>{item.text}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4">
          <div className="quantum-panel p-3">
            <div className="text-sm font-semibold text-quantum-cyan mb-1">System Status</div>
            <div className="flex items-center gap-2 text-xs">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span className="text-muted-foreground">Quantum Processing: Online</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
