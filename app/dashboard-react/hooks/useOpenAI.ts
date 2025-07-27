// Importa o hook useState do React
import { useState } from 'react';

/**
 * Interface para a configuração da API OpenAI.
 */
interface OpenAIConfig {
  apiKey: string;             // Chave da API (obrigatória)
  model?: string;             // Modelo da OpenAI (ex: gpt-3.5-turbo)
  temperature?: number;       // Grau de aleatoriedade da resposta
  maxTokens?: number;         // Número máximo de tokens na resposta
}

/**
 * Interface que representa uma mensagem no chat.
 */
interface ChatMessage {
  role: 'system' | 'user' | 'assistant'; // Papel da mensagem
  content: string;                       // Texto da mensagem
}

/**
 * Hook personalizado para integração com a API da OpenAI.
 * Permite o envio de mensagens e o controle de estado de carregamento e erro.
 * 
 * @returns {Object} Um objeto com a função de envio, status de carregamento e erro.
 */
export const useOpenAI = () => {
  // Estado para indicar se a requisição está em andamento
  const [isLoading, setIsLoading] = useState(false);

  // Estado para armazenar mensagens de erro, se houver
  const [error, setError] = useState<string | null>(null);

  /**
   * Função que envia uma sequência de mensagens para a OpenAI e retorna a resposta da IA.
   * 
   * @param {string} apiKey - A chave de acesso da API da OpenAI.
   * @param {ChatMessage[]} messages - Histórico de mensagens do chat.
   * @param {Partial<OpenAIConfig>} config - Configurações opcionais para o modelo.
   * @returns {Promise<string>} - Conteúdo da resposta gerada pela IA.
   */
  const sendMessage = async (
    apiKey: string,
    messages: ChatMessage[],
    config: Partial<OpenAIConfig> = {}
  ): Promise<string> => {
    // Validação: a chave da API é obrigatória
    if (!apiKey.trim()) {
      throw new Error('API Key da OpenAI é obrigatória');
    }

    // Inicia o carregamento e limpa erros anteriores
    setIsLoading(true);
    setError(null);

    try {
      // Realiza chamada à API da OpenAI
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`, // Envia a API key no cabeçalho
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: config.model || 'gpt-3.5-turbo',         // Modelo padrão
          messages,                                       // Contexto da conversa
          temperature: config.temperature || 0.7,         // Aleatoriedade da resposta
          max_tokens: config.maxTokens || 1000,           // Limite de tokens
        }),
      });

      // Se a resposta não for OK, tenta extrair a mensagem de erro
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Erro na API OpenAI');
      }

      // Processa a resposta e extrai o conteúdo da mensagem da IA
      const data = await response.json();
      return data.choices[0]?.message?.content || 'Sem resposta da IA';
    } catch (err) {
      // Trata qualquer erro da requisição
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      // Finaliza o carregamento, independentemente do resultado
      setIsLoading(false);
    }
  };

  // Retorna as funções e estados que podem ser usados no componente
  return {
    sendMessage,         // Função para enviar mensagem à OpenAI
    isLoading,           // Estado de carregamento (booleano)
    error,               // Erro atual, se houver
    clearError: () => setError(null), // Função para limpar o erro manualmente
  };
};
