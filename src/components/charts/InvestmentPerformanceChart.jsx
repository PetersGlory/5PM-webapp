import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { name: 'Nexus Vault', invested: 1000000, returns: 180000 },
  { name: 'Real Estate A', invested: 2000000, returns: 400000 },
  { name: 'Wealth Plan', invested: 500000, returns: 75000 },
  { name: 'Real Estate B', invested: 1500000, returns: 300000 },
  { name: 'Fixed Income', invested: 800000, returns: 120000 },
];

function InvestmentPerformanceChart() {
  const formatVal = (v) => `₦${(v / 1000000).toFixed(1)}M`;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} />
        <YAxis tickFormatter={formatVal} tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} />
        <Tooltip formatter={(v) => [`₦${v.toLocaleString()}`, '']} />
        <Legend />
        <Bar dataKey="invested" name="Invested" fill="#1C3A8A" radius={[4, 4, 0, 0]} />
        <Bar dataKey="returns" name="Returns" fill="#00B8DB" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default InvestmentPerformanceChart;
