import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { teachersByRegionData } from '../../data/mockData';

const TeachersByRegionChart = () => {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={teachersByRegionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false}/>
          <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false}/>
          <Tooltip wrapperClassName="!bg-background !border-border" />
          <Bar dataKey="value" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TeachersByRegionChart;
