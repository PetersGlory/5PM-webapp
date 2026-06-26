import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', return: 0 },
  { month: 'Feb', return: 15000 },
  { month: 'Mar', return: 15000 },
  { month: 'Apr', return: 30000 },
  { month: 'May', return: 30000 },
  { month: 'Jun', return: 45000 },
  { month: 'Jul', return: 45000 },
  { month: 'Aug', return: 60000 },
  { month: 'Sep', return: 60000 },
  { month: 'Oct', return: 75000 },
  { month: 'Nov', return: 75000 },
  { month: 'Dec', return: 90000 },
];

function ReturnHistoryChart() {
  const formatVal = (v) => `₦${v.toLocaleString()}`;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} />
        <YAxis tickFormatter={formatVal} tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} />
        <Tooltip formatter={(v) => [`₦${v.toLocaleString()}`, 'Returns']} />
        <Area type="monotone" dataKey="return" stroke="#10B981" strokeWidth={2} fill="#10B981" fillOpacity={0.1} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default ReturnHistoryChart;
