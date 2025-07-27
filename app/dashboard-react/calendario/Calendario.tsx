import React, { useState } from 'react';

// Importa componentes de UI reutilizáveis (Card, Badge, Button) e ícones da biblioteca lucide-react
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { CalendarDays, Clock, MapPin, Users } from 'lucide-react';

const Calendario = () => {
  // Estado para controlar o mês selecionado (inicializado no mês atual)
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  // Estado para o ano selecionado (ano atual fixo, sem alteração no componente)
  const [selectedYear] = useState(new Date().getFullYear());

  // Lista de eventos com dados mockados: título, data, hora, tipo, local, participantes e descrição
  const events = [
    {
      id: 1,
      title: "Inscrições Abertas - Turma 2024",
      date: "2024-06-20",
      time: "09:00",
      type: "deadline",
      location: "Online",
      participants: 0,
      description: "Abertura das inscrições para a turma 2024 do programa Futuras Cientistas"
    },
    {
      id: 2,
      title: "Workshop de Introdução à Ciência",
      date: "2024-06-25",
      time: "14:00",
      type: "workshop",
      location: "UNIFESP - São Paulo",
      participants: 45,
      description: "Workshop introdutório sobre metodologia científica"
    },
    {
      id: 3,
      title: "Encerramento das Inscrições",
      date: "2024-07-15",
      time: "23:59",
      type: "deadline",
      location: "Online",
      participants: 0,
      description: "Data limite para submissão das inscrições"
    },
    {
      id: 4,
      title: "Divulgação dos Resultados",
      date: "2024-07-30",
      time: "16:00",
      type: "announcement",
      location: "Online",
      participants: 0,
      description: "Divulgação da lista de alunas selecionadas"
    },
    {
      id: 5,
      title: "Feira de Ciências Regional",
      date: "2024-08-15",
      time: "09:00",
      type: "event",
      location: "Centro de Convenções - Rio de Janeiro",
      participants: 120,
      description: "Apresentação dos projetos desenvolvidos pelas alunas"
    }
  ];

  // Função para definir a cor do Badge conforme o tipo do evento
  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "deadline": return "bg-red-500";
      case "workshop": return "bg-blue-500";
      case "announcement": return "bg-green-500";
      case "event": return "bg-purple-500";
      default: return "bg-gray-500";
    }
  };

  // Função para retornar o label legível do tipo do evento
  const getEventTypeLabel = (type: string) => {
    switch (type) {
      case "deadline": return "Prazo";
      case "workshop": return "Workshop";
      case "announcement": return "Divulgação";
      case "event": return "Evento";
      default: return "Outros";
    }
  };

  // Filtra os próximos eventos que ainda vão acontecer (data maior ou igual à atual), limitando a 3 eventos
  const upcomingEvents = events.filter(event => new Date(event.date) >= new Date()).slice(0, 3);

  return (
    <div className="space-y-6">

      {/* Cabeçalho da página com título e descrição */}
      <div>
        <h1 className="text-3xl font-bold">Calendário</h1>
        <p className="mt-2 text-muted-foreground">
          Acompanhe os eventos, prazos e atividades do programa Futuras Cientistas.
        </p>
      </div>

      {/* Layout grid com área principal e sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Área principal: lista de todos os eventos */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5" />
                Todos os Eventos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Mapeia cada evento para exibir título, badge, descrição, data, hora, local e participantes */}
                {events.map((event) => (
                  <div key={event.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{event.title}</h3>
                          <Badge variant="secondary" className={`${getEventTypeColor(event.type)} text-white`}>
                            {getEventTypeLabel(event.type)}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          {/* Ícone e data do evento */}
                          <div className="flex items-center gap-1">
                            <CalendarDays className="h-4 w-4" />
                            {new Date(event.date).toLocaleDateString('pt-BR')}
                          </div>
                          {/* Ícone e hora */}
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {event.time}
                          </div>
                          {/* Ícone e local */}
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {event.location}
                          </div>
                          {/* Participantes (se houver) */}
                          {event.participants > 0 && (
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {event.participants} participantes
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar com próximos eventos e estatísticas do mês */}
        <div className="space-y-6">

          {/* Lista dos próximos 3 eventos */}
          <Card>
            <CardHeader>
              <CardTitle>Próximos Eventos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="border-l-4 border-purple-500 pl-3">
                    <h4 className="font-medium text-sm">{event.title}</h4>
                    <p className="text-xs text-muted-foreground">
                      {new Date(event.date).toLocaleDateString('pt-BR')} às {event.time}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Estatísticas resumidas do mês atual */}
          <Card>
            <CardHeader>
              <CardTitle>Estatísticas do Mês</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Eventos programados</span>
                  <span className="font-medium">5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Workshops realizados</span>
                  <span className="font-medium">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Participantes totais</span>
                  <span className="font-medium">285</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Taxa de presença</span>
                  <span className="font-medium">87%</span>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default Calendario;
