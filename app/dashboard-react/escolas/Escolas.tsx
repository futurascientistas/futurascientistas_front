import React from 'react';
import KpiCard from '../components/dashboard/KpiCard';
import ChartCard from '../components/dashboard/ChartCard';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { School, Users, MapPin, Award } from 'lucide-react';
import SchoolCategoryDonutChart from '../components/charts/SchoolCategoryDonutChart';

const Escolas = () => {
  // Dados dos KPIs principais relacionados às escolas participantes
  const escolasKpis = [
    {
      title: "Escolas Parceiras",
      value: "342",
      change: "+23%",
      changeType: "positive" as const,
      icon: School,
    },
    {
      title: "Alunas Participantes",
      value: "2,845",
      change: "+18%",
      changeType: "positive" as const,
      icon: Users,
    },
    {
      title: "Cidades Atendidas",
      value: "158",
      change: "+12%",
      changeType: "positive" as const,
      icon: MapPin,
    },
    {
      title: "Escolas Premiadas",
      value: "67",
      change: "+34%",
      changeType: "positive" as const,
      icon: Award,
    },
  ];

  // Lista das 5 melhores escolas com detalhes relevantes para o ranking
  const topSchools = [
    {
      name: "EMEF Santos Dumont",
      city: "São Paulo - SP",
      students: 45,
      projects: 12,
      category: "Municipal",
      rating: 4.8
    },
    {
      name: "EMEF João XXIII",
      city: "Rio de Janeiro - RJ",
      students: 38,
      projects: 10,
      category: "Municipal",
      rating: 4.7
    },
    {
      name: "Colégio Estadual Dom Pedro II",
      city: "Belo Horizonte - MG",
      students: 42,
      projects: 11,
      category: "Estadual",
      rating: 4.6
    },
    {
      name: "EMEF Machado de Assis",
      city: "Porto Alegre - RS",
      students: 35,
      projects: 9,
      category: "Municipal",
      rating: 4.5
    },
    {
      name: "Instituto Federal do Ceará",
      city: "Fortaleza - CE",
      students: 51,
      projects: 15,
      category: "Federal",
      rating: 4.9
    }
  ];

  // Dados da distribuição das escolas por região do Brasil, com número e porcentagem
  const regionData = [
    { region: "Sudeste", schools: 142, percentage: 41.5 },
    { region: "Nordeste", schools: 98, percentage: 28.7 },
    { region: "Sul", schools: 67, percentage: 19.6 },
    { region: "Norte", schools: 23, percentage: 6.7 },
    { region: "Centro-Oeste", schools: 12, percentage: 3.5 }
  ];

  // Função que define a cor da badge com base na categoria da escola
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Municipal": return "bg-blue-100 text-blue-800";
      case "Estadual": return "bg-green-100 text-green-800";
      case "Federal": return "bg-purple-100 text-purple-800";
      case "Particular": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Cabeçalho com título e descrição da página */}
      <div>
        <h1 className="text-3xl font-bold">Escolas</h1>
        <p className="mt-2 text-muted-foreground">
          Métricas sobre as escolas participantes do programa Futuras Cientistas.
        </p>
      </div>

      {/* Exibição dos KPIs principais em grid responsivo */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {escolasKpis.map((kpi) => (
          <KpiCard key={kpi.title} {...kpi} />
        ))}
      </div>

      {/* Layout principal com gráficos e listas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Seção principal que ocupa duas colunas em telas maiores */}
        <div className="lg:col-span-2 space-y-6">
          {/* Gráfico de pizza mostrando categorias de escolas */}
          <ChartCard title="Categorias de Escolas">
            <SchoolCategoryDonutChart />
          </ChartCard>

          {/* Distribuição das escolas por região com barras de progresso */}
          <Card>
            <CardHeader>
              <CardTitle>Distribuição por Região</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {regionData.map((region) => (
                  <div key={region.region} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{region.region}</span>
                      <span className="text-sm text-muted-foreground">
                        {region.schools} escolas ({region.percentage}%)
                      </span>
                    </div>
                    {/* Barra visual representando a porcentagem da região */}
                    <Progress value={region.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Seção lateral com lista das top 5 escolas e métricas adicionais */}
        <div className="space-y-6">
          {/* Lista das top 5 escolas com detalhes e badges coloridos */}
          <Card>
            <CardHeader>
              <CardTitle>Top 5 Escolas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topSchools.map((school, index) => (
                  <div key={school.name} className="border rounded-lg p-3">
                    <div className="flex items-start justify-between mb-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          {/* Ranking da escola */}
                          <span className="text-sm font-medium text-purple-600">#{index + 1}</span>
                          <h4 className="font-medium text-sm">{school.name}</h4>
                        </div>
                        <p className="text-xs text-muted-foreground">{school.city}</p>
                      </div>
                      {/* Categoria da escola com badge colorida */}
                      <Badge variant="secondary" className={getCategoryColor(school.category)}>
                        {school.category}
                      </Badge>
                    </div>
                    {/* Informações numéricas resumidas */}
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="text-center">
                        <p className="font-medium">{school.students}</p>
                        <p className="text-muted-foreground">Alunas</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium">{school.projects}</p>
                        <p className="text-muted-foreground">Projetos</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium">{school.rating}</p>
                        <p className="text-muted-foreground">Avaliação</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Card com métricas gerais de engajamento no programa */}
          <Card>
            <CardHeader>
              <CardTitle>Métricas de Engajamento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Participação ativa</span>
                  <span className="font-medium">89%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Projetos submetidos</span>
                  <span className="font-medium">156</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Eventos participados</span>
                  <span className="font-medium">423</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Satisfação média</span>
                  <span className="font-medium">4.6/5</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Escolas;
