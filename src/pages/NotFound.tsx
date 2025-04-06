
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-quantum-blue p-4">
      <div className="quantum-panel p-8 max-w-md text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-quantum-grid bg-[length:20px_20px]"></div>
        </div>
        
        <div className="relative z-10">
          <div className="mb-6">
            <div className="mx-auto h-20 w-20 rounded-full bg-quantum-cyan/10 flex items-center justify-center animate-pulse-glow">
              <div className="h-14 w-14 rounded-full bg-quantum-blue flex items-center justify-center">
                <div className="h-8 w-8 rounded-full bg-quantum-cyan/30"></div>
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl font-bold text-quantum-cyan mb-2">404</h1>
          <p className="text-xl text-foreground mb-6">Quantum Anomaly Detected</p>
          <p className="text-muted-foreground mb-8">
            The neural pathway you're trying to access doesn't exist in our multi-dimensional space. 
            Our quantum agents are investigating this anomaly.
          </p>
          
          <Link to="/">
            <Button className="gap-2">
              <ArrowLeft size={16} />
              Return to Command Center
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
