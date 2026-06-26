import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', value: 1000000 },
  { month: 'Feb', value: 1200000 },
  { month: 'Mar', value: 1150000 },
  { month: 'Apr', value: 1400000 },
  { month: 'May', value: 1800000 },
  { month: 'Jun', value: 2200000 },
  { month: 'Jul', value: 2100000 },
  { month: 'Aug', value: 2500000 },
  { month: 'Sep', value: 2800000 },
  { month: 'Oct', value: 3100000 },
  { month: 'Nov', value: 3500000 },
  { month: 'Dec', value: 4000000 },
];

function PortfolioGrowthChart() {
  const formatValue = (v) => `₦${(v / 1000000).toFixed(1)}M`;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} />
        <YAxis tickFormatter={formatValue} tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} />
        <Tooltip formatter={(v) => [`₦${v.toLocaleString()}`, 'Portfolio Value']} />
        <Line type="monotone" dataKey="value" stroke="#00B8DB" strokeWidth={2} dot={{ fill: '#00B8DB', r: 3 }} activeDot={{ r: 5 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default PortfolioGrowthChart;
