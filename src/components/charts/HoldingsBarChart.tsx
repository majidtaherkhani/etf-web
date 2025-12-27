import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Card } from '../ui/Card';

export const HoldingsBarChart = ({ data, title, dataKeys }: { data: any[]; title?: string; dataKeys: { label: string; value: string } }) => (
  <Card className="h-[350px] p-6">
    {title && <h3 className="text-lg font-bold mb-4 text-gray-800">{title}</h3>}
    <ResponsiveContainer width="100%" height="85%">
      <BarChart data={data} layout="vertical" margin={{ left: 40 }}>
        <XAxis type="number" hide />
        <YAxis dataKey={dataKeys.label} type="category" width={50} tick={{fontWeight: 'bold'}} />
        <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', backgroundColor: 'white', padding: '8px 12px' }} />
        <Bar dataKey={dataKeys.value} radius={[0, 4, 4, 0]} barSize={30}>
          {data.map((_, i) => (
            <Cell key={i} fill={i % 2 === 0 ? '#3b82f6' : '#60a5fa'} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </Card>
);