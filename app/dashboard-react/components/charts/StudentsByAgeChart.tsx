import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { studentsByAgeData } from '../../data/mockData';

/**
 * Componente StudentsByAgeChart
 * 
 * Gráfico de barras verticais mostrando a distribuição de alunas por faixa etária
 * 
 * @returns {JSX.Element} Componente do gráfico de idades
 */
const StudentsByAgeChart = () => {
  return (
    <div style={{ width: '100%', height: 500 }}>
      <ResponsiveContainer>
        <BarChart data={studentsByAgeData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false}/>
          <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false}/>
          <Tooltip wrapperClassName="!bg-background !border-border" />
          <Bar dataKey="value" fill="#ec4899" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StudentsByAgeChart;
