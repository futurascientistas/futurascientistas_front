import React from 'react';
import ChartCard from './ChartCard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { MoreHorizontal, Reply } from 'lucide-react';

const inboxData = [
  {
    id: 1,
    name: "Prof. Maria Santos",
    avatar: "/placeholder.svg",
    subject: "Dúvida sobre projeto científico",
    message: "Gostaria de orientações sobre o desenvolvimento do projeto de biologia...",
    time: "2h",
    priority: "alta",
    unread: true
  },
  {
    id: 2,
    name: "Coordenação SP",
    avatar: "/placeholder.svg", 
    subject: "Relatório mensal enviado",
    message: "Segue em anexo o relatório de atividades do mês de junho...",
    time: "5h",
    priority: "normal",
    unread: true
  },
  {
    id: 3,
    name: "Ana Silva",
    avatar: "/placeholder.svg",
    subject: "Agradecimento",
    message: "Muito obrigada pelo apoio durante todo o programa!",
    time: "1d",
    priority: "baixa",
    unread: false
  },
  {
    id: 4,
    name: "Sistema",
    avatar: "/placeholder.svg",
    subject: "Backup concluído",
    message: "O backup automático dos dados foi realizado com sucesso.",
    time: "2d",
    priority: "normal",
    unread: false
  }
];

const InboxCard = () => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'alta': return 'bg-red-500';
      case 'normal': return 'bg-yellow-500';
      case 'baixa': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <ChartCard title="Caixa de Entrada">
      <div className="space-y-4 max-h-80 overflow-y-auto">
        {inboxData.map((item) => (
          <div key={item.id} className={`p-3 rounded-lg border transition-colors hover:bg-gray-50 ${
            item.unread ? 'bg-purple-50 border-purple-200' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-start gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={item.avatar} />
                <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className={`text-sm font-medium truncate ${
                    item.unread ? 'text-brand-purple' : 'text-gray-900'
                  }`}>
                    {item.name}
                  </h4>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${getPriorityColor(item.priority)}`}></div>
                    <span className="text-xs text-gray-500">{item.time}</span>
                  </div>
                </div>
                <h5 className={`text-sm truncate mb-1 ${
                  item.unread ? 'font-medium' : 'font-normal'
                }`}>
                  {item.subject}
                </h5>
                <p className="text-xs text-gray-600 line-clamp-2">
                  {item.message}
                </p>
                {item.unread && (
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary" className="text-xs bg-brand-purple text-white">
                      Nova
                    </Badge>
                    <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                      <Reply className="h-3 w-3 mr-1" />
                      Responder
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-3 border-t">
        <Button variant="outline" className="w-full" size="sm">
          Ver todas as mensagens
        </Button>
      </div>
    </ChartCard>
  );
};

export default InboxCard;
