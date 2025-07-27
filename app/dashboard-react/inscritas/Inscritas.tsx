import React from 'react';
import KpiCard from '../components/dashboard/KpiCard';
import ChartCard from '../components/dashboard/ChartCard';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Users, TrendingUp, Clock, CheckCircle } from 'lucide-react';

const Inscritas = () => {
  // Dados dos KPIs principais sobre inscrições
  const inscritasKpis = [
    {
      title: "Total de Inscritas",
      value: "8,245",
      change: "+15%",
      changeType: "positive" as const,
      icon: Users,
    },
    {
      title: "Crescimento Mensal",
      value: "12.5%",
      change: "+2.3%",
      changeType: "positive" as const,
      icon: TrendingUp,
    },
    {
      title: "Prazo Médio",
      value: "3.2 dias",
      change: "-0.8d",
      changeType: "positive" as const,
      icon: Clock,
    },
    {
      title: "Taxa de Aprovação",
      value: "78%",
      change: "+5%",
      changeType: "positive" as const,
      icon: CheckCircle,
    },
  ];

  // Dados simulados das inscrições recentes com status
  const recentApplications = [
    { name: "Maria Silva", school: "EMEF Santos Dumont", date: "Hoje", status: "Pendente" },
    { name: "Ana Costa", school: "EMEF João XXIII", date: "Ontem", status: "Aprovada" },
    { name: "Julia Santos", school: "EMEF Dom Pedro II", date: "2 dias", status: "Em Análise" },
    { name: "Carla Oliveira", school: "EMEF Machado de Assis", date: "3 dias", status: "Aprovada" },
    { name: "Sofia Lima", school: "EMEF Castro Alves", date: "4 dias", status: "Pendente" },
  ];

  // Função para retornar a cor do badge com base no status da inscrição
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Aprovada": return "bg-green-500";
      case "Pendente": return "bg-yellow-500";
      case "Em Análise": return "bg-blue-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      {/* Cabeçalho da página */}
      <div>
        <h1 className="text-3xl font-bold">Inscritas</h1>
        <p className="mt-2 text-muted-foreground">
          Acompanhe as inscrições e o processo de seleção das alunas.
        </p>
      </div>

      {/* Grid para mostrar os KPIs principais */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {inscritasKpis.map((kpi) => (
          <KpiCard key={kpi.title} {...kpi} />
        ))}
      </div>

      {/* Seção com informações detalhadas em duas colunas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna maior com progresso de inscrições por região */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Inscrições por Região</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Para cada região, mostra o nome, quantidade e barra de progresso */}
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Sudeste</span>
                  <span className="text-sm text-muted-foreground">3,245 (39.4%)</span>
                </div>
                <Progress value={39.4} className="h-2" />
                {/* Repetir para outras regiões */}
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Nordeste</span>
                  <span className="text-sm text-muted-foreground">2,156 (26.1%)</span>
                </div>
                <Progress value={26.1} className="h-2" />
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Sul</span>
                  <span className="text-sm text-muted-foreground">1,687 (20.5%)</span>
                </div>
                <Progress value={20.5} className="h-2" />
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Norte</span>
                  <span className="text-sm text-muted-foreground">789 (9.6%)</span>
                </div>
                <Progress value={9.6} className="h-2" />
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Centro-Oeste</span>
                  <span className="text-sm text-muted-foreground">368 (4.4%)</span>
                </div>
                <Progress value={4.4} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Coluna menor com lista das inscrições recentes e seus status */}
        <Card>
          <CardHeader>
            <CardTitle>Inscrições Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentApplications.map((app, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{app.name}</p>
                    <p className="text-xs text-muted-foreground">{app.school}</p>
                  </div>
                  <div className="text-right space-y-1">
                    {/* Badge colorido conforme status */}
                    <Badge variant="secondary" className={`${getStatusColor(app.status)} text-white`}>
                      {app.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground">{app.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Inscritas;


