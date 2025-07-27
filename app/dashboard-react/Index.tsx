import React from 'react';
import KpiCard from './components/dashboard/KpiCard';
import ChartCard from './components/dashboard/ChartCard';
import { kpiData } from './data/mockData';
import ProjectsByRegionBarChart from './components/charts/ProjectsByRegionBarChart';
import SchoolCategoryDonutChart from './components/charts/SchoolCategoryDonutChart';
import QuotaDistributionBarChart from './components/charts/QuotaDistributionBarChart';
import InboxCard from './components/dashboard/InboxCard';
import TopCitiesCard from './components/dashboard/TopCitiesCard';

const Index = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">KPI Drivers</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi) => (
          <KpiCard key={kpi.title} {...kpi} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
           <ChartCard title="Distribuição de Projetos por Região">
                <ProjectsByRegionBarChart />
           </ChartCard>
           <ChartCard title="Distribuição de Cotas">
                <QuotaDistributionBarChart />
           </ChartCard>
        </div>
        <div className="lg:col-span-1 space-y-6">
            <ChartCard title="Categorias Escolas">
                <SchoolCategoryDonutChart />
            </ChartCard>
            <InboxCard />
            <TopCitiesCard />
        </div>
      </div>
    </div>
  );
};

export default Index;
