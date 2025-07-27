import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

/**
 * Dados do funil de retenção das alunas,
 * mostrando quantas permanecem em cada etapa do programa,
 * desde a inscrição até a conclusão, com percentual de retenção.
 */
const retentionData = [
  { 
    name: 'Inscritas', 
    value: 8245, 
    retention: 100
  },
  { 
    name: 'Selecionadas', 
    value: 6850, 
    retention: 83.1
  },
  { 
    name: 'Iniciaram', 
    value: 6420, 
    retention: 77.9
  },
  { 
    name: 'Concluíram', 
    value: 5010, 
    retention: 60.8
  },
];

/**
 * Componente CustomTooltip
 * 
 * Tooltip personalizado para mostrar detalhes das etapas no gráfico,
 * exibindo o nome da etapa, número de alunas e percentual de retenção.
 */
interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-background border border-border rounded-lg p-4 shadow-lg">
        <p className="font-semibold text-brand-purple text-lg mb-2">{label}</p>
        <div className="space-y-1 text-sm">
          <p className="text-brand-pink">
            <span className="font-medium">{data.value.toLocaleString()}</span> alunas
          </p>
          <p className="text-green-600">
            Retenção: <span className="font-medium">{data.retention}%</span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

/**
 * Componente WaterfallFunnelChart
 * 
 * Gráfico de linha que visualiza a retenção percentual das alunas
 * ao longo das etapas do programa educacional,
 * facilitando o entendimento do fluxo e possíveis perdas.
 * 
 * Utiliza o CustomTooltip para exibir dados detalhados ao passar o mouse.
 * 
 * @returns {JSX.Element} Componente gráfico do funil de retenção
 */
const WaterfallFunnelChart: React.FC = () => {
  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={retentionData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 60,
          }}
        >
          {/* Grade de fundo suave para melhor leitura */}
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
          
          {/* Eixo X com nomes das etapas, rotacionados para melhor encaixe */}
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 12, fill: '#666' }}
            angle={-20}
            textAnchor="end"
            height={60}
            interval={0}
          />
          
          {/* Eixo Y mostrando porcentagem de retenção, formatado com % */}
          <YAxis 
            tick={{ fontSize: 12, fill: '#666' }}
            tickFormatter={(value) => `${value}%`}
            domain={[0, 100]}
          />
          
          {/* Tooltip personalizado */}
          <Tooltip content={<CustomTooltip />} />
          
          {/* Linha principal representando o percentual de retenção */}
          <Line 
            type="monotone" 
            dataKey="retention" 
            stroke="#8b5cf6" 
            strokeWidth={4}
            dot={{ r: 8, fill: '#8b5cf6', strokeWidth: 3, stroke: '#fff' }}
            activeDot={{ r: 10, stroke: '#8b5cf6', strokeWidth: 3, fill: '#fff' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WaterfallFunnelChart;
