import React from 'react';
import ChartCard from './ChartCard';
import { topCitiesData } from '../../data/mockData';

/**
 * Interface para dados de cidades
 */
interface CityData {
  city: string;
  state: string;
  students: number;
  projects: number;
}

/**
 * Componente TopCitiesCard
 * 
 * Exibe um ranking das 5 cidades com maior número de inscrições
 * no programa Futuras Cientistas.
 * 
 * Funcionalidades:
 * - Lista ordenada das principais cidades participantes
 * - Exibe número de alunas e projetos por cidade
 * - Design responsivo com gradiente temático
 * - Informações organizadas por estado
 * 
 * @returns {JSX.Element} Card com lista das top 5 cidades
 */
const TopCitiesCard: React.FC = () => {
  return (
    <ChartCard title="Top 5 Cidades com Maior Número de Inscrição">
      <ul className="space-y-3">
        {topCitiesData.map((cityData: CityData, index: number) => (
          <li 
            key={`${cityData.city}-${cityData.state}-${index}`}
            className="flex items-center justify-between p-3 bg-gradient-to-r from-brand-pink/10 to-brand-purple/10 rounded-lg border border-brand-lilac/20 transition-all hover:from-brand-pink/15 hover:to-brand-purple/15"
          >
            {/* Informações da cidade e estado */}
            <div className="flex flex-col">
              <span className="font-semibold text-brand-purple text-base">
                {cityData.city}
              </span>
              <span className="text-sm text-gray-600">
                {cityData.state}
              </span>
            </div>
            
            {/* Métricas de participação */}
            <div className="flex flex-col text-right">
              <span className="text-sm font-medium text-brand-pink">
                {cityData.students} alunas
              </span>
              <span className="text-xs text-gray-500">
                {cityData.projects} projetos
              </span>
            </div>
          </li>
        ))}
      </ul>
    </ChartCard>
  );
};

export default TopCitiesCard;
