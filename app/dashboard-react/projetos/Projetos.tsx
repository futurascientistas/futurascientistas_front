import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { FlaskConical, Users, Award, TrendingUp, Eye } from 'lucide-react';
import KpiCard from '../components/dashboard/KpiCard';

const Projetos = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const projetosKpis = [
    {
      title: "Projetos Ativos",
      value: "156",
      change: "+12%",
      changeType: "positive" as const,
      icon: FlaskConical,
    },
    {
      title: "Alunas Envolvidas",
      value: "624",
      change: "+18%",
      changeType: "positive" as const,
      icon: Users,
    },
    {
      title: "Projetos Concluídos",
      value: "89",
      change: "+8%",
      changeType: "positive" as const,
      icon: Award,
    },
    {
      title: "Taxa de Sucesso",
      value: "94%",
      change: "+3%",
      changeType: "positive" as const,
      icon: TrendingUp,
    },
  ];

  const projects = [
    {
      id: 1,
      title: "Análise da Qualidade da Água em Rios Urbanos",
      area: "Química Ambiental",
      students: ["Maria Silva", "Ana Costa", "Julia Santos"],
      mentor: "Prof. Dr. Carlos Oliveira",
      school: "EMEF Santos Dumont",
      status: "Em Desenvolvimento",
      progress: 65,
      description: "Projeto que visa analisar a qualidade da água de rios urbanos através de testes químicos e físicos.",
      startDate: "2024-03-15",
      expectedEnd: "2024-12-15"
    },
    {
      id: 2,
      title: "Desenvolvimento de Aplicativo para Monitoramento de Plantas",
      area: "Tecnologia e Biologia",
      students: ["Carla Oliveira", "Sofia Lima"],
      mentor: "Prof. Dra. Fernanda Santos",
      school: "EMEF João XXIII",
      status: "Concluído",
      progress: 100,
      description: "Criação de um aplicativo mobile para monitoramento do crescimento de plantas.",
      startDate: "2024-01-10",
      expectedEnd: "2024-06-10"
    },
    {
      id: 3,
      title: "Estudo sobre Energia Solar em Escolas Públicas",
      area: "Física e Sustentabilidade",
      students: ["Beatriz Ferreira", "Isabella Rodrigues", "Gabriela Alves"],
      mentor: "Prof. Dr. Roberto Lima",
      school: "EMEF Dom Pedro II",
      status: "Planejamento",
      progress: 25,
      description: "Análise da viabilidade e eficiência de painéis solares em escolas públicas.",
      startDate: "2024-05-01",
      expectedEnd: "2024-11-30"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Concluído": return "bg-green-500";
      case "Em Desenvolvimento": return "bg-blue-500";
      case "Planejamento": return "bg-yellow-500";
      default: return "bg-gray-500";
    }
  };

  const getAreaColor = (area: string) => {
    switch (area) {
      case "Química Ambiental": return "bg-emerald-100 text-emerald-800";
      case "Tecnologia e Biologia": return "bg-blue-100 text-blue-800";
      case "Física e Sustentabilidade": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Projetos</h1>
        <p className="mt-2 text-muted-foreground">
          Acompanhe o desenvolvimento dos projetos científicos das alunas.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {projetosKpis.map((kpi) => (
          <KpiCard key={kpi.title} {...kpi} />
        ))}
      </div>

      <Tabs defaultValue="todos" className="space-y-6">
        <TabsList>
          <TabsTrigger value="todos">Todos os Projetos</TabsTrigger>
          <TabsTrigger value="desenvolvimento">Em Desenvolvimento</TabsTrigger>
          <TabsTrigger value="concluidos">Concluídos</TabsTrigger>
          <TabsTrigger value="planejamento">Planejamento</TabsTrigger>
        </TabsList>

        <TabsContent value="todos" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {projects.map((project) => (
              <Card key={project.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className={getAreaColor(project.area)}>
                          {project.area}
                        </Badge>
                        <Badge variant="secondary" className={`${getStatusColor(project.status)} text-white`}>
                          {project.status}
                        </Badge>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      {selectedProject === project.id ? 'Ocultar' : 'Detalhes'}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">{project.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="font-medium">Alunas</p>
                        <p className="text-muted-foreground">{project.students.join(", ")}</p>
                      </div>
                      <div>
                        <p className="font-medium">Mentora</p>
                        <p className="text-muted-foreground">{project.mentor}</p>
                      </div>
                      <div>
                        <p className="font-medium">Escola</p>
                        <p className="text-muted-foreground">{project.school}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progresso</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>

                    {selectedProject === project.id && (
                      <div className="border-t pt-4 space-y-3">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="font-medium">Data de Início</p>
                            <p className="text-muted-foreground">
                              {new Date(project.startDate).toLocaleDateString('pt-BR')}
                            </p>
                          </div>
                          <div>
                            <p className="font-medium">Previsão de Conclusão</p>
                            <p className="text-muted-foreground">
                              {new Date(project.expectedEnd).toLocaleDateString('pt-BR')}
                            </p>
                          </div>
                        </div>
                        <div>
                          <p className="font-medium text-sm">Próximas Etapas</p>
                          <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                            <li>Coleta de dados experimentais</li>
                            <li>Análise estatística dos resultados</li>
                            <li>Preparação da apresentação final</li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="desenvolvimento">
          <div className="text-center py-8">
            <p className="text-muted-foreground">Filtros por status em desenvolvimento...</p>
          </div>
        </TabsContent>

        <TabsContent value="concluidos">
          <div className="text-center py-8">
            <p className="text-muted-foreground">Filtros por projetos concluídos em desenvolvimento...</p>
          </div>
        </TabsContent>

        <TabsContent value="planejamento">
          <div className="text-center py-8">
            <p className="text-muted-foreground">Filtros por projetos em planejamento em desenvolvimento...</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Projetos;
