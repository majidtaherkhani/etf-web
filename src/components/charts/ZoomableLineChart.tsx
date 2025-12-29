import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Brush, CartesianGrid } from 'recharts';
import { Card } from '../ui/Card';

interface ZoomableLineChartProps {
  data: any[];
  title?: string;
  xAxisKey: string;
  yAxisKey: string;
  xAxisFormatter?: (value: any) => string;
}

export const ZoomableLineChart = ({ 
  data, 
  title, 
  xAxisKey, 
  yAxisKey,
  xAxisFormatter = (value) => String(value)
}: ZoomableLineChartProps) => (
  <Card className="h-[450px] p-6">
    {title && <h3 className="text-lg font-bold mb-4 text-gray-800 text-center">{title}</h3>}
    <ResponsiveContainer width="100%" height="85%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
        <XAxis 
          dataKey={xAxisKey} 
          tick={{fontSize: 12}} 
          minTickGap={30} 
          tickFormatter={xAxisFormatter} 
        />
        <YAxis domain={['auto', 'auto']} tick={{fontSize: 12}} />
        <Tooltip 
          contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} 
          labelFormatter={xAxisFormatter} 
        />
        <Line 
          type="monotone" 
          dataKey={yAxisKey} 
          name="Value" 
          stroke="#2563eb" 
          strokeWidth={2} 
          dot={false} 
        />
        <Brush 
          dataKey={xAxisKey} 
          height={30} 
          stroke="#94a3b8" 
          fill="#f8fafc" 
          tickFormatter={xAxisFormatter} 
          travellerWidth={10} 
        />
      </LineChart>
    </ResponsiveContainer>
  </Card>
);
