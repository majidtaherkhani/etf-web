import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Card } from '../ui/Card';

export const HoldingsBarChart = ({ data }: { data: any[] }) => (
  <Card className="h-[350px] p-6">
    <h3 className="text-lg font-bold mb-4 text-gray-800">Top 5 Holdings</h3>
    <ResponsiveContainer width="100%" height="85%">
      <BarChart data={data} layout="vertical" margin={{ left: 40 }}>
        <XAxis type="number" hide />
        <YAxis dataKey="ticker" type="category" width={50} tick={{fontWeight: 'bold'}} />
        <Tooltip cursor={{fill: 'transparent'}} />
        <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={30}>
          {data.map((_, i) => (
            <Cell key={i} fill={i % 2 === 0 ? '#3b82f6' : '#60a5fa'} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </Card>
);