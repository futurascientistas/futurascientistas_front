import React from 'react';

// Importa componentes reutilizáveis para visualização de dados
import ChartCard from '../components/dashboard/ChartCard';

// Importa os gráficos específicos relacionados às alunas
import StudentFunnelChart from '../components/charts/StudentFunnelChart';
import ScientificAreaDistributionChart from '../components/charts/ScientificAreaDistributionChart';
import StudentsByAgeChart from '../components/charts/StudentsByAgeChart';
import StudentGradeChart from '../components/charts/StudentGradeChart';
import StudentAttendanceChart from '../components/charts/StudentAttendanceChart';

// Importa o chatbot com análise baseada em IA
import AIAnalysisChatbot from '../components/chatbot/AIAnalysisChatbot';

const Alunas = () => {
  return (
    <div className="space-y-6">
      
      {/* Cabeçalho da página */}
      <div>
        <h1 className="text-3xl font-bold">Alunas</h1>
        <p className="mt-2 text-muted-foreground">
          Métricas e análises detalhadas sobre as alunas participantes do programa Futuras Cientistas.
        </p>
      </div>

      {/* Seção com os gráficos e o chatbot */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Coluna com gráficos principais */}
        <div className="lg:col-span-2 space-y-6">

          {/* Linha com dois gráficos lado a lado */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard title="Funil de Alunas">
              {/* Gráfico de funil mostrando etapas de entrada/progresso das alunas */}
              <StudentFunnelChart />
            </ChartCard>
            
            <ChartCard title="Distribuição por Área Científica">
              {/* Gráfico mostrando a distribuição de alunas por áreas do conhecimento */}
              <ScientificAreaDistributionChart />
            </ChartCard>
          </div>

          {/* Gráfico de séries escolares (fundamental, médio, etc.) */}
          <ChartCard title="Distribuição por Série Escolar">
            <StudentGradeChart />
          </ChartCard>

          {/* Linha com dois gráficos lado a lado */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard title="Distribuição por Idade">
              <StudentsByAgeChart />
            </ChartCard>
            
            <ChartCard title="Frequência nas Atividades (%)">
              <StudentAttendanceChart />
            </ChartCard>
          </div>
        </div>

        {/* Coluna com o chatbot de análise IA */}
        <div className="lg:col-span-1">
          <AIAnalysisChatbot />
        </div>
      </div>
    </div>
  );
};

export default Alunas;
