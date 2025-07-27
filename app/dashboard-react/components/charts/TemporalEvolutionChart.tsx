import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

const temporalData = [
  { mes: 'Jan', inscricoes: 580, projetos_iniciados: 420, projetos_concluidos: 380 },
  { mes: 'Fev', inscricoes: 680, projetos_iniciados: 520, projetos_concluidos: 450 },
  { mes: 'Mar', inscricoes: 750, projetos_iniciados: 580, projetos_concluidos: 490 },
  { mes: 'Abr', inscricoes: 820, projetos_iniciados: 650, projetos_concluidos: 580 },
  { mes: 'Mai', inscricoes: 890, projetos_iniciados: 720, projetos_concluidos: 620 },
  { mes: 'Jun', inscricoes: 950, projetos_iniciados: 780, projetos_concluidos: 690 },
];

const TemporalEvolutionChart = () => {
  return (
    <div style={{ width: '100%', height: 350 }}>
      <ResponsiveContainer>
        <LineChart data={temporalData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mes" stroke="#888888" fontSize={12} tickLine={false} axisLine={false}/>
          <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false}/>
          <Tooltip wrapperClassName="!bg-background !border-border" />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="inscricoes" 
            stroke="#8b5cf6" 
            strokeWidth={3} 
            dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
            name="Inscrições"
          />
          <Line 
            type="monotone" 
            dataKey="projetos_iniciados" 
            stroke="#ec4899" 
            strokeWidth={3} 
            dot={{ fill: '#ec4899', strokeWidth: 2, r: 4 }}
            name="Projetos Iniciados"
          />
          <Line 
            type="monotone" 
            dataKey="projetos_concluidos" 
            stroke="#10b981" 
            strokeWidth={3} 
            dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
            name="Projetos Concluídos"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TemporalEvolutionChart;
