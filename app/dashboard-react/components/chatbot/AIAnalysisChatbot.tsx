
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import { Badge } from '../../components/ui/badge';
import { Separator } from '../../components/ui/separator';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { Send, Bot, User, Sparkles, BarChart3, TrendingUp, Users, Key, AlertCircle } from 'lucide-react';
import { useOpenAI } from '../../hooks/useOpenAI';

/**
 * Interface para estrutura de mensagens do chat
 */
interface Message {
  id: number;
  type: 'user' | 'bot';
  content: string;
  timestamp: string;
  suggestions?: string[];
  isError?: boolean;
}

/**
 * Prompt do sistema para contextualizar a IA sobre o projeto
 */
const SYSTEM_PROMPT = `Você é a assistente de IA do programa "Futuras Cientistas", um projeto educacional que visa incentivar meninas na área de ciências.

Contexto do programa:
- Total de 8.245 alunas inscritas
- 6.850 selecionadas (83.1% de aprovação)
- 6.420 iniciaram o programa (93.7% de conversão)
- 5.010 concluíram (78% de conclusão)
- Distribuição regional: Sudeste (35%), Nordeste (24%), Sul (20%), Norte (12%), Centro-Oeste (9%)
- Tipos de escola: Regular (47%), Técnica (28%), Integral (16%), Semi-integral (9%)
- Diversidade: 47.5% ampla concorrência, 36.3% PPI/Quilombolas, 10.8% PCD, 5.4% Trans/Travestis

Você deve:
1. Analisar dados educacionais com foco em diversidade e inclusão
2. Fornecer insights baseados nos dados apresentados
3. Sugerir melhorias para o programa
4. Responder de forma clara e objetiva
5. Usar emojis relevantes para tornar as respostas mais visuais

Mantenha respostas concisas (máximo 200 palavras) e sempre ofereça 2-3 sugestões de perguntas relacionadas.`;

/**
 * Componente AIAnalysisChatbot
 * 
 * Chatbot inteligente integrado com OpenAI para análise de dados educacionais
 * Permite interação em tempo real com IA para insights sobre o programa Futuras Cientistas
 * 
 * @returns {JSX.Element} Componente do chatbot
 */
const AIAnalysisChatbot: React.FC = () => {
  // Estados do componente
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [apiKey, setApiKey] = useState(localStorage.getItem('openai_api_key') || '');
  const [showApiKeyInput, setShowApiKeyInput] = useState(!apiKey);
  
  // Refs e hooks
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { sendMessage, isLoading, error } = useOpenAI();

  /**
   * Efeito para scroll automático para última mensagem
   */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  /**
   * Inicializa o chat com mensagem de boas-vindas
   */
  useEffect(() => {
    if (apiKey && messages.length === 0) {
      const welcomeMessage: Message = {
        id: 1,
        type: 'bot',
        content: '👋 Olá! Sou a assistente de IA do Futuras Cientistas. Posso ajudar você a analisar dados, gerar insights e responder perguntas sobre o programa. Como posso te ajudar hoje?',
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        suggestions: [
          'Analisar performance por região',
          'Gerar relatório de diversidade',
          'Mostrar tendências temporais'
        ]
      };
      setMessages([welcomeMessage]);
    }
  }, [apiKey, messages.length]);

  /**
   * Salva a API key no localStorage
   * 
   * @param {string} key - Chave da API OpenAI
   */
  const handleSaveApiKey = (key: string) => {
    localStorage.setItem('openai_api_key', key);
    setApiKey(key);
    setShowApiKeyInput(false);
  };

  /**
   * Envia mensagem para a IA e processa resposta
   * 
   * @param {string} [message] - Mensagem opcional (para sugestões)
   */
  const handleSendMessage = async (message?: string) => {
    const textToSend = message || inputMessage.trim();
    if (!textToSend || !apiKey) return;

    // Cria mensagem do usuário
    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    try {
      // Prepara contexto para IA
      const chatMessages = [
        { role: 'system' as const, content: SYSTEM_PROMPT },
        ...messages.slice(-5).map(msg => ({
          role: msg.type === 'user' ? 'user' as const : 'assistant' as const,
          content: msg.content
        })),
        { role: 'user' as const, content: textToSend }
      ];

      // Envia para OpenAI
      const response = await sendMessage(apiKey, chatMessages, {
        temperature: 0.7,
        maxTokens: 500
      });

      // Cria mensagem da IA
      const botMessage: Message = {
        id: Date.now() + 1,
        type: 'bot',
        content: response,
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        suggestions: generateSuggestions(textToSend)
      };

      setMessages(prev => [...prev, botMessage]);

    } catch (err) {
      // Mensagem de erro
      const errorMessage: Message = {
        id: Date.now() + 1,
        type: 'bot',
        content: `❌ Erro ao processar sua mensagem: ${err instanceof Error ? err.message : 'Erro desconhecido'}`,
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        isError: true
      };

      setMessages(prev => [...prev, errorMessage]);
    }
  };

  /**
   * Gera sugestões contextuais baseadas na mensagem do usuário
   * 
   * @param {string} userInput - Entrada do usuário
   * @returns {string[]} Array de sugestões
   */
  const generateSuggestions = (userInput: string): string[] => {
    const input = userInput.toLowerCase();
    
    if (input.includes('região') || input.includes('regional')) {
      return ['Comparar regiões', 'Fatores de sucesso regionais', 'Expandir para novas regiões'];
    }
    
    if (input.includes('diversidade') || input.includes('cota')) {
      return ['Melhorar inclusão PCD', 'Estratégias para PPI', 'Ações LGBTQI+'];
    }
    
    if (input.includes('escola') || input.includes('ensino')) {
      return ['Parcerias com escolas técnicas', 'Suporte escolas regulares', 'Avaliar performance'];
    }

    return ['Ver dados regionais', 'Analisar diversidade', 'Tendências temporais'];
  };

  /**
   * Limpa o histórico de mensagens
   */
  const handleClearChat = () => {
    setMessages([]);
    setTimeout(() => {
      const welcomeMessage: Message = {
        id: 1,
        type: 'bot',
        content: '👋 Chat limpo! Como posso te ajudar agora?',
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        suggestions: ['Analisar performance', 'Dados de diversidade', 'Insights regionais']
      };
      setMessages([welcomeMessage]);
    }, 100);
  };

  // Renderização condicional para configuração da API Key
  if (showApiKeyInput) {
    return (
      <Card className="h-[600px] flex flex-col border-brand-purple/20">
        <CardHeader className="bg-gradient-to-r from-brand-purple to-brand-pink text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            Configuração da IA
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col justify-center p-6">
          <div className="space-y-4 max-w-md mx-auto">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Para usar o chatbot inteligente, você precisa fornecer sua chave da API OpenAI.
                Ela será armazenada localmente no seu navegador.
              </AlertDescription>
            </Alert>
            
            <div className="space-y-2">
              <label htmlFor="api-key" className="text-sm font-medium">
                Chave da API OpenAI:
              </label>
              <Input
                id="api-key"
                type="password"
                placeholder="sk-..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="border-brand-purple/20 focus:border-brand-purple"
              />
            </div>
            
            <Button 
              onClick={() => handleSaveApiKey(apiKey)}
              disabled={!apiKey.trim()}
              className="w-full bg-brand-purple hover:bg-brand-purple-vibrant"
            >
              Salvar e Continuar
            </Button>
            
            <p className="text-xs text-muted-foreground text-center">
              Não tem uma chave? <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-brand-purple hover:underline">Criar conta OpenAI</a>
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-[600px] flex flex-col border-brand-purple/20">
      <CardHeader className="bg-gradient-to-r from-brand-purple to-brand-pink text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            Assistente de IA - Análise de Dados
            <Badge variant="secondary" className="bg-white/20 text-white border-0">
              <Sparkles className="h-3 w-3 mr-1" />
              OpenAI
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowApiKeyInput(true)}
            className="text-white hover:bg-white/20"
          >
            <Key className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 p-0 flex flex-col">
        {/* Área de mensagens */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              {message.type === 'bot' && (
                <Avatar className="w-8 h-8 bg-brand-purple">
                  <AvatarFallback className="bg-brand-purple text-white">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}
              
              <div className={`max-w-[75%] ${message.type === 'user' ? 'order-first' : ''}`}>
                <div className={`p-3 rounded-lg ${
                  message.type === 'user' 
                    ? 'bg-brand-purple text-white ml-auto' 
                    : message.isError
                    ? 'bg-red-50 text-red-800 border border-red-200'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {message.content}
                  </div>
                </div>
                
                <div className={`text-xs text-muted-foreground mt-1 ${
                  message.type === 'user' ? 'text-right' : 'text-left'
                }`}>
                  {message.timestamp}
                </div>

                {/* Sugestões do bot */}
                {message.type === 'bot' && message.suggestions && !message.isError && (
                  <div className="mt-3 space-y-2">
                    <p className="text-xs text-muted-foreground">Sugestões:</p>
                    <div className="flex flex-wrap gap-2">
                      {message.suggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="text-xs h-7 border-brand-purple/30 hover:bg-brand-purple hover:text-white"
                          onClick={() => handleSendMessage(suggestion)}
                          disabled={isLoading}
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {message.type === 'user' && (
                <Avatar className="w-8 h-8 bg-brand-pink">
                  <AvatarFallback className="bg-brand-pink text-white">
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}

          {/* Indicador de digitação */}
          {isLoading && (
            <div className="flex gap-3">
              <Avatar className="w-8 h-8 bg-brand-purple">
                <AvatarFallback className="bg-brand-purple text-white">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="bg-gray-100 p-3 rounded-lg">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-brand-purple rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-brand-purple rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-brand-purple rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        <Separator />
        
        {/* Área de input */}
        <div className="p-4">
          {error && (
            <Alert className="mb-3 border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                {error}
              </AlertDescription>
            </Alert>
          )}
          
          <div className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Digite sua pergunta sobre os dados..."
              className="flex-1 border-brand-purple/20 focus:border-brand-purple"
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
              disabled={isLoading}
            />
            <Button 
              onClick={() => handleSendMessage()}
              disabled={!inputMessage.trim() || isLoading}
              className="bg-brand-purple hover:bg-brand-purple-vibrant"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Atalhos rápidos */}
          <div className="flex gap-2 mt-2 justify-between">
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs h-6"
                onClick={() => handleSendMessage('Mostrar KPIs principais')}
                disabled={isLoading}
              >
                <BarChart3 className="h-3 w-3 mr-1" />
                KPIs
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs h-6"
                onClick={() => handleSendMessage('Analisar tendências')}
                disabled={isLoading}
              >
                <TrendingUp className="h-3 w-3 mr-1" />
                Tendências
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs h-6"
                onClick={() => handleSendMessage('Dados de diversidade')}
                disabled={isLoading}
              >
                <Users className="h-3 w-3 mr-1" />
                Diversidade
              </Button>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              className="text-xs h-6 text-red-500 hover:text-red-700"
              onClick={handleClearChat}
              disabled={isLoading}
            >
              Limpar Chat
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIAnalysisChatbot;
