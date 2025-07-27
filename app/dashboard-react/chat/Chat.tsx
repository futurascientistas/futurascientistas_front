import React from 'react';
// Importa o componente do chatbot de análise com IA
import AIAnalysisChatbot from '../components/chatbot/AIAnalysisChatbot';

const Chat = () => {
  return (
    // Container principal com altura total disponível
    <div className="h-full">
      
      {/* Cabeçalho com título e descrição do assistente IA */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground">Assistente IA</h1>
        <p className="text-muted-foreground">Converse com o assistente para análises dos dados do programa</p>
      </div>
      
      {/* Área principal que ocupará quase toda a altura da tela, reservando espaço para o cabeçalho e margens */}
      <div className="h-[calc(100vh-200px)]">
        {/* Componente do chatbot IA que gerencia a interação */}
        <AIAnalysisChatbot />
      </div>
    </div>
  );
};

export default Chat;
