import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Search, Send, Paperclip, MoreVertical, Star, Archive } from 'lucide-react';

const Mensagens = () => {
  // Estado que guarda a mensagem atualmente selecionada pelo usuário (id)
  const [selectedMessage, setSelectedMessage] = useState(1);

  // Lista simulada de mensagens com dados básicos
  const messages = [
    {
      id: 1,
      sender: 'Ana Carolina',
      subject: 'Relatório Mensal - Janeiro 2024',
      preview: 'Segue em anexo o relatório completo das atividades...',
      time: '14:30',
      unread: true,
      starred: true,
      avatar: 'AC'
    },
    {
      id: 2,
      sender: 'Sistema Futuras Cientistas',
      subject: 'Nova atualização disponível',
      preview: 'Uma nova versão do sistema foi lançada com melhorias...',
      time: '12:15',
      unread: true,
      starred: false,
      avatar: 'S'
    },
    {
      id: 3,
      sender: 'Maria Fernanda',
      subject: 'Dúvidas sobre inscrições',
      preview: 'Olá, tenho algumas perguntas sobre o processo...',
      time: '10:20',
      unread: false,
      starred: false,
      avatar: 'MF'
    },
    {
      id: 4,
      sender: 'João Silva',
      subject: 'Aprovação de projetos',
      preview: 'Os projetos foram analisados e precisam de...',
      time: '09:45',
      unread: false,
      starred: true,
      avatar: 'JS'
    }
  ];

  // Encontra a mensagem atualmente selecionada na lista
  const currentMessage = messages.find(msg => msg.id === selectedMessage);

  return (
    <div className="space-y-6">
      {/* Cabeçalho da página */}
      <div>
        <h1 className="text-3xl font-bold text-brand-purple">Mensagens</h1>
        <p className="text-muted-foreground">Gerencie suas conversas e comunicações</p>
      </div>

      {/* Layout principal: lista de mensagens à esquerda, conteúdo da mensagem à direita */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        
        {/* Lista de Mensagens */}
        <div className="lg:col-span-1">
          <Card className="h-full border-brand-purple/20">
            <CardHeader>
              {/* Título e badge com quantidade de mensagens não lidas */}
              <div className="flex items-center justify-between">
                <CardTitle className="text-brand-purple">Caixa de Entrada</CardTitle>
                <Badge className="bg-brand-pink text-white">
                  {messages.filter(m => m.unread).length} novas
                </Badge>
              </div>
              {/* Campo de busca para filtrar mensagens */}
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar mensagens..." className="pl-10" />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {/* Lista das mensagens */}
              <div className="space-y-0">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    onClick={() => setSelectedMessage(message.id)} // Seleciona a mensagem ao clicar
                    className={`p-4 border-b cursor-pointer transition-colors hover:bg-brand-purple/5 ${
                      selectedMessage === message.id ? 'bg-brand-purple/10 border-l-4 border-l-brand-purple' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Avatar do remetente */}
                      <Avatar className="w-10 h-10">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback className="bg-brand-lilac text-white text-xs">
                          {message.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        {/* Nome do remetente e horário */}
                        <div className="flex items-center justify-between">
                          <p className={`font-medium text-sm truncate ${message.unread ? 'text-brand-purple' : 'text-gray-900'}`}>
                            {message.sender}
                          </p>
                          <div className="flex items-center gap-1">
                            {/* Ícone estrela se marcado como favorito */}
                            {message.starred && <Star className="h-3 w-3 fill-brand-pink text-brand-pink" />}
                            <span className="text-xs text-muted-foreground">{message.time}</span>
                          </div>
                        </div>
                        {/* Assunto da mensagem */}
                        <p className={`text-sm truncate ${message.unread ? 'font-medium' : 'text-muted-foreground'}`}>
                          {message.subject}
                        </p>
                        {/* Preview do conteúdo */}
                        <p className="text-xs text-muted-foreground truncate mt-1">
                          {message.preview}
                        </p>
                      </div>
                    </div>
                    {/* Indicador de mensagem não lida */}
                    {message.unread && (
                      <div className="w-2 h-2 bg-brand-pink rounded-full ml-auto mt-2"></div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Visualização da Mensagem selecionada */}
        <div className="lg:col-span-2">
          <Card className="h-full border-brand-purple/20">
            {currentMessage ? (
              <>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Avatar da mensagem */}
                      <Avatar>
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback className="bg-brand-lilac text-white">
                          {currentMessage.avatar}
                        </AvatarFallback>
                      </Avatar>
                      {/* Remetente e assunto */}
                      <div>
                        <h3 className="font-semibold text-brand-purple">{currentMessage.sender}</h3>
                        <p className="text-sm text-muted-foreground">{currentMessage.subject}</p>
                      </div>
                    </div>
                    {/* Botões de ações (favoritar, arquivar, mais opções) */}
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Star className={`h-4 w-4 ${currentMessage.starred ? 'fill-brand-pink text-brand-pink' : 'text-gray-400'}`} />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Archive className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <Separator />
                <CardContent className="flex-1 p-6">
                  {/* Conteúdo detalhado da mensagem */}
                  <div className="space-y-4">
                    <div className="text-sm text-muted-foreground">
                      Hoje às {currentMessage.time}
                    </div>
                    <div className="prose max-w-none">
                      <p className="text-gray-700 leading-relaxed">
                        {currentMessage.preview} Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
                        veniam, quis nostrud exercitation ullamco laboris.
                      </p>
                      <p className="text-gray-700 leading-relaxed mt-4">
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
                        culpa qui officia deserunt mollit anim id est laborum.
                      </p>
                    </div>
                  </div>
                </CardContent>
                <Separator />
                {/* Área para responder mensagem */}
                <div className="p-4">
                  <div className="flex gap-2">
                    <Input placeholder="Digite sua resposta..." className="flex-1" />
                    <Button variant="ghost" size="icon">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button className="bg-brand-purple hover:bg-brand-purple-vibrant">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              // Mensagem padrão caso nenhuma mensagem esteja selecionada
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">Selecione uma mensagem para visualizar</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Mensagens;
// Mensagens.tsx - Componente de mensagens com layout responsivo e interativo
// Este componente exibe uma lista de mensagens e o conteúdo da mensag
// selecionada, permitindo ações como favoritar, arquivar e responder.