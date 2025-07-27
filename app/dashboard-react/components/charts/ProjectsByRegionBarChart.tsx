import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const projectsByRegionData = [
  { name: 'Sudeste', value: 45, color: '#795DC0' }, // brand-purple
  { name: 'Nordeste', value: 32, color: '#E36BAC' }, // brand-pink
  { name: 'Sul', value: 28, color: '#62A9D2' }, // brand-blue
  { name: 'Centro-Oeste', value: 18, color: '#4DC1B1' }, // brand-green
  { name: 'Norte', value: 12, color: '#795DC0' }, // brand-purple (mais escuro)
];

const ProjectsByRegionBarChart = () => {
  return (
    <div style={{ width: '100%', height: 250 }}>
      <ResponsiveContainer>
        <BarChart data={projectsByRegionData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <XAxis 
            dataKey="name" 
            stroke="#795DC0" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false}
          />
          <YAxis 
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
            radius={[4, 4, 0, 0]}
          >
            {projectsByRegionData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProjectsByRegionBarChart;
