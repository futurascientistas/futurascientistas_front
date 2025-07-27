// Importa o React para criação de componentes funcionais
import React from 'react';
// Importa componentes de Card para estruturar o layout
import { Card, CardContent, CardHeader } from '../../components/ui/card';
// Importa o componente Skeleton para exibir placeholders de carregamento
import { Skeleton } from '../../components/ui/skeleton';

// Componente ChartLoading: exibe um card com skeletons enquanto o gráfico está carregando
export const ChartLoading = () => {
  return (
    <Card>
      <CardHeader>
        {/* Skeleton para o título do gráfico */}
        <Skeleton className="h-6 w-48" />
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {/* Skeletons para linhas de texto e área do gráfico */}
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-40 w-full" />
          <div className="flex justify-between">
            {/* Skeletons para possíveis legendas ou valores */}
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Componente ChartError: exibe uma mensagem de erro caso o gráfico não carregue
export const ChartError = ({ message }: { message?: string }) => {
  return (
    <Card>
      <CardContent className="flex items-center justify-center h-40">
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            {/* Mostra a mensagem de erro recebida ou uma padrão */}
            {message || 'Erro ao carregar dados'}
          </p>
          <p className="text-xs text-muted-foreground">
            Tente novamente em alguns instantes
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

