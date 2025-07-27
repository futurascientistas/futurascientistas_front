import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

/**
 * Dados de diversidade por tipo de cota
 * Representa a distribuição de alunas em diferentes categorias
 */
const diversityData = [
  { categoria: 'Ampla Concorrência', regular: 1200, tecnica: 980, professoras: 450 },
  { categoria: 'PPI e Quilombolas', regular: 1050, tecnica: 850, professoras: 380 },
  { categoria: 'Trans e Travestis', regular: 120, tecnica: 95, professoras: 45 },
  { categoria: 'PCD', regular: 180, tecnica: 145, professoras: 68 },
];

/**
 * Componente DiversityQuotaChart
 * 
 * Gráfico de barras agrupadas mostrando a distribuição de cotas
 * por tipo de escola e categoria de professoras
 * 
 * @returns {JSX.Element} Componente do gráfico de cotas
 */
const DiversityQuotaChart = () => {
  return (
    <div style={{ width: '100%', height: 350 }}>
      <ResponsiveContainer>
        <BarChart data={diversityData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="categoria" 
            stroke="#888888" 
            fontSize={10} 
            tickLine={false} 
            axisLine={false}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false}/>
          <Tooltip wrapperClassName="!bg-background !border-border" />
          <Legend />
          <Bar dataKey="regular" fill="#10b981" radius={[4, 4, 0, 0]} name="Escolas Regulares" />
          <Bar dataKey="tecnica" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Escolas Técnicas" />
          <Bar dataKey="professoras" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Professoras" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DiversityQuotaChart;
