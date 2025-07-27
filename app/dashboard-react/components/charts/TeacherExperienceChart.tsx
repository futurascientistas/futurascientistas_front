import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const experienceData = [
  { name: '0-2 anos', value: 180, fill: '#8b5cf6' },
  { name: '3-5 anos', value: 320, fill: '#ec4899' },
  { name: '6-10 anos', value: 450, fill: '#f59e0b' },
  { name: '11-15 anos', value: 380, fill: '#10b981' },
  { name: '16+ anos', value: 290, fill: '#3b82f6' },
];

const TeacherExperienceChart = () => {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Tooltip wrapperClassName="!bg-background !border-border" />
          <Pie
            data={experienceData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
          >
            {experienceData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TeacherExperienceChart;
