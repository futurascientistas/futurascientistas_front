import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const quotaDistributionData = [
  { name: 'Escola Pública', value: 65, color: '#795DC0' }, // brand-purple
  { name: 'Baixa Renda', value: 45, color: '#E36BAC' }, // brand-pink
  { name: 'Negros/Pardos', value: 38, color: '#62A9D2' }, // brand-blue
  { name: 'Indígenas', value: 12, color: '#4DC1B1' }, // brand-green
  { name: 'PcD', value: 8, color: '#795DC0' }, // brand-purple variant
];

const QuotaDistributionBarChart = () => {
  return (
    <div style={{ width: '100%', height: 250 }}>
      <ResponsiveContainer>
        <BarChart data={quotaDistributionData} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
          <XAxis type="number" hide />
          <YAxis 
            type="category" 
            dataKey="name" 
            stroke="#795DC0" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
          />
          <Tooltip 
            wrapperClassName="!bg-white !border-brand-purple !shadow-lg"
            contentStyle={{
              backgroundColor: '#F4F4FC',
              border: '1px solid #795DC0',
              borderRadius: '8px',
              color: '#795DC0'
            }}
          />
          <Bar 
            dataKey="value" 
            radius={[0, 4, 4, 0]}
          >
            {quotaDistributionData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default QuotaDistributionBarChart;
