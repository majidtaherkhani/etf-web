import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Brush, CartesianGrid } from 'recharts';
import { Card } from '../ui/Card';

export const ZoomableLineChart = ({ data }: { data: any[] }) => (
  <Card className="h-[450px] p-6">
    <h3 className="text-lg font-bold mb-4 text-gray-800 text-center">Historical Net Asset Value</h3>
    <ResponsiveContainer width="100%" height="85%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
        <XAxis dataKey="date" tick={{fontSize: 12}} minTickGap={30} tickFormatter={(value) => value.split(/[T ]/)[0]} />
        <YAxis domain={['auto', 'auto']} tick={{fontSize: 12}} />
        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} labelFormatter={(value) => value.split(/[T ]/)[0]} />
        <Line type="monotone" dataKey="nav" name="Price" stroke="#2563eb" strokeWidth={2} dot={false} />
        <Brush dataKey="date" height={30} stroke="#94a3b8" fill="#f8fafc" tickFormatter={(value) => value.split(/[T ]/)[0]} travellerWidth={10} />
      </LineChart>
    </ResponsiveContainer>
  </Card>
);