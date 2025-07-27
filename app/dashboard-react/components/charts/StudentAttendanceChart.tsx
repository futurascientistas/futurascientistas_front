import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

/**
 * Dados de frequência mensal das alunas
 */
const attendanceData = [
  { month: 'Jan', frequency: 95 },
  { month: 'Fev', frequency: 92 },
  { month: 'Mar', frequency: 88 },
  { month: 'Abr', frequency: 94 },
  { month: 'Mai', frequency: 91 },
  { month: 'Jun', frequency: 96 },
];

/**
 * Componente StudentAttendanceChart
 * 
 * Gráfico de linha mostrando a evolução da frequência das alunas
 * ao longo dos meses do programa
 * 
 * @returns {JSX.Element} Componente do gráfico de frequência
 */
const StudentAttendanceChart = () => {
  return (
    <div style={{ width: '100%', height: 500 }}>
      <ResponsiveContainer>
        <LineChart data={attendanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false}/>
          <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} domain={[80, 100]}/>
          <Tooltip wrapperClassName="!bg-background !border-border" formatter={(value) => [`${value}%`, 'Frequência']} />
          <Line type="monotone" dataKey="frequency" stroke="#ec4899" strokeWidth={3} dot={{ fill: '#ec4899', strokeWidth: 2, r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StudentAttendanceChart;
