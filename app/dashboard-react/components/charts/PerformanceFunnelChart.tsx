import React from 'react';
import WaterfallFunnelChart from './WaterfallFunnelChart';

/**
 * Componente PerformanceFunnelChart
 * 
 * Componente wrapper simples que encapsula e renderiza o gráfico de funil de performance.
 *  WaterfallFunnelChart para exibir visualmente os dados de forma clara e intuitiva.
 * 
 *  manter a separação de responsabilidades e facilitar a manutenção do código.
 * 
 * @returns {JSX.Element} Componente React que exibe o gráfico de funil de performance
 */
const PerformanceFunnelChart: React.FC = () => {
  return <WaterfallFunnelChart />;
};

export default PerformanceFunnelChart;
