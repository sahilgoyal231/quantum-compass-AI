
import React from "react";
import {
  Bar,
  Line,
  Pie,
  BarChart as RechartsBarChart,
  LineChart as RechartsLineChart,
  PieChart as RechartsPieChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// Bar Chart Component
interface BarChartProps {
  data: {
    data: Array<{ name: string; value: number }>;
    categories: string[];
    colors: string[];
  };
}

export const BarChart: React.FC<BarChartProps> = ({ data }) => {
  return (
    <ChartContainer config={{}}>
      <RechartsBarChart data={data.data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <ChartTooltip
          content={<ChartTooltipContent />}
        />
        <Bar dataKey="value" fill={data.colors[0]} radius={[4, 4, 0, 0]} />
      </RechartsBarChart>
    </ChartContainer>
  );
};

// Line Chart Component
interface LineChartProps {
  data: {
    data: Array<{ name: string; value: number }>;
    categories: string[];
    colors: string[];
  };
}

export const LineChart: React.FC<LineChartProps> = ({ data }) => {
  return (
    <ChartContainer config={{}}>
      <RechartsLineChart data={data.data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <ChartTooltip
          content={<ChartTooltipContent />}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="value"
          stroke={data.colors[0]}
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
      </RechartsLineChart>
    </ChartContainer>
  );
};

// Pie Chart Component
interface PieChartProps {
  data: {
    data: Array<{ name: string; value: number }>;
    colors: string[];
  };
}

export const PieChart: React.FC<PieChartProps> = ({ data }) => {
  return (
    <ChartContainer config={{}}>
      <RechartsPieChart margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <ChartTooltip
          content={<ChartTooltipContent />}
        />
        <Pie
          data={data.data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={data.colors[index % data.colors.length]} />
          ))}
        </Pie>
        <Legend />
      </RechartsPieChart>
    </ChartContainer>
  );
};
