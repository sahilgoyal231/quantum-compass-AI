
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from '@/lib/utils';

interface AnalyticsCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  change?: string;
  changeDirection?: 'up' | 'down';
  className?: string;
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({ 
  title, 
  value, 
  description, 
  icon, 
  change, 
  changeDirection, 
  className 
}) => {
  return (
    <Card className={cn("quantum-panel overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
        {change && (
          <div className="flex items-center mt-2">
            <span className={cn(
              "text-xs font-medium mr-1",
              changeDirection === 'up' ? 'text-green-500' : 'text-red-500'
            )}>
              {change}
            </span>
            <span className="text-xs text-muted-foreground">vs previous period</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AnalyticsCard;
