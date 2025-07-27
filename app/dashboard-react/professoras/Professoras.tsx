import React from 'react';
import ChartCard from '../components/dashboard/ChartCard';
import TeachersByRegionChart from '../components/charts/TeachersByRegionChart';
import TeachersBySchoolTypeChart from '../components/charts/TeachersBySchoolTypeChart';
import TeachersByFormationChart from '../components/charts/TeachersByFormationChart';

const Professoras = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold">Página de Professoras</h1>
      <p className="mt-2 mb-6 text-muted-foreground">
        Aqui são exibidos os gráficos e métricas relacionadas às professoras.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Professoras por Região">
          <TeachersByRegionChart />
        </ChartCard>
        <ChartCard title="Professoras por Tipo de Escola">
          <TeachersBySchoolTypeChart />
        </ChartCard>
        <ChartCard title="Distribuição por Formação Acadêmica" className="lg:col-span-2">
          <TeachersByFormationChart />
        </ChartCard>
      </div>
    </div>
  );
};

export default Professoras;
