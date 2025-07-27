import React from 'react';
import ChartCard from '../components/dashboard/ChartCard';
import TemporalEvolutionChart from '../components/charts/TemporalEvolutionChart';
import DiversityQuotaChart from '../components/charts/DiversityQuotaChart';
import PerformanceFunnelChart from '../components/charts/PerformanceFunnelChart';
import TeacherExperienceChart from '../components/charts/TeacherExperienceChart';
import ProjectsByRegionBarChart from '../components/charts/ProjectsByRegionBarChart';
import ScientificAreaDistributionChart from '../components/charts/ScientificAreaDistributionChart';

const Graficos = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-brand-purple">Gráficos e Análises</h1>
        <p className="mt-2 text-muted-foreground">
          Visualizações completas dos dados do programa Futuras Cientistas com análises detalhadas de performance, diversidade e evolução temporal.
        </p>
      </div>

      {/* Evolução Temporal */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-brand-purple"> Evolução Temporal</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Evolução de Inscrições e Projetos">
            <TemporalEvolutionChart />
          </ChartCard>
          <ChartCard title="Funil de Performance das Alunas">
            <PerformanceFunnelChart />
          </ChartCard>
        </div>
      </div>

      {/* Diversidade e Inclusão */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-brand-purple"> Diversidade e Inclusão</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Distribuição por Tipos de Cota" className="lg:col-span-2">
            <DiversityQuotaChart />
          </ChartCard>
        </div>
      </div>

      {/* Envolvimento das Professoras */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-brand-purple"> Envolvimento das Professoras</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Professoras por Tempo de Experiência">
            <TeacherExperienceChart />
          </ChartCard>
          <ChartCard title="Distribuição Regional">
            <ProjectsByRegionBarChart />
          </ChartCard>
        </div>
      </div>

      {/* Produção Científica */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-brand-purple"> Produção Científica</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Projetos por Área Científica">
            <ScientificAreaDistributionChart />
          </ChartCard>
          <ChartCard title="Análise de Impacto Regional">
            <ProjectsByRegionBarChart />
          </ChartCard>
        </div>
      </div>
    </div>
  );
};

export default Graficos;
