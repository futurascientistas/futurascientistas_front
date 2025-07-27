import * as React from "react" // Importa o React
import * as TabsPrimitive from "@radix-ui/react-tabs" // Importa os componentes primitivos de abas da Radix UI
import { cn } from "../../lib/utils" // Função utilitária para concatenar classes condicionalmente

// Componente raiz das abas (Tabs)
const Tabs = TabsPrimitive.Root

// Componente que agrupa os botões de navegação entre as abas
const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>, // Tipo do elemento referenciado
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> // Props sem ref
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground", // Estilo padrão da barra de abas
      className // Permite adicionar ou sobrescrever estilos via props
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName // Define o nome de exibição no DevTools

// Componente que representa o botão de uma aba
const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all", // Estilo base do botão
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", // Estilo ao focar (acessibilidade)
      "disabled:pointer-events-none disabled:opacity-50", // Quando desabilitado
      "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm", // Quando ativo
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

// Componente que exibe o conteúdo associado à aba ativa
const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", // Estilo padrão + acessibilidade
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

// Exporta os componentes para serem usados em outros arquivos
export { Tabs, TabsList, TabsTrigger, TabsContent }
