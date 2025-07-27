import React from 'react';
import { FunnelChart, Funnel, Tooltip, ResponsiveContainer, LabelList } from 'recharts';
import { studentFunnelData } from '../../data/mockData';

/**
 * Componente StudentFunnelChart
 * 
 * Renderiza um gráfico de funil que representa o fluxo de estudantes
 * nas diferentes etapas do programa educacional.
 * 
 * Funcionalidades e características:
 * - Visualização em formato clássico de funil, ilustrando a diminuição
 *   ou progresso do número de estudantes em cada etapa.
 * - Tooltip estilizado com classes personalizadas para manter a
 *   identidade visual do tema da aplicação.
 * - Labels posicionados à direita de cada segmento, exibindo o nome
 *   das etapas para fácil leitura.
 * - Animação ativa para uma transição suave na renderização do funil.
 * 
 * @returns {JSX.Element} Componente do gráfico de funil de estudantes
 */
const StudentFunnelChart: React.FC = () => {
  return (
    <div style={{ width: '100%', height: 250 }}>
      <ResponsiveContainer>
        <FunnelChart>
          {/* Tooltip customizado com estilo do tema */}
          <Tooltip wrapperClassName="!bg-background !border-border" />
          
          {/* Funil principal exibindo dados das etapas */}
          <Funnel 
            dataKey="value" 
            data={studentFunnelData} 
            isAnimationActive
          >
            {/* Labels à direita, exibindo o nome das etapas */}
            <LabelList 
              position="right" 
              fill="#000" 
              stroke="none" 
              dataKey="name" 
            />
          </Funnel>
        </FunnelChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StudentFunnelChart;
