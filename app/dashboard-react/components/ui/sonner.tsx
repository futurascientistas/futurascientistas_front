import { useTheme } from "next-themes" 
// Hook para acessar e controlar o tema (claro, escuro, sistema) no Next.js

import { Toaster as Sonner, toast } from "sonner" 
// Importa o componente Toaster e função toast da biblioteca Sonner para notificações

type ToasterProps = React.ComponentProps<typeof Sonner> 
// Define o tipo das props do Toaster com base no componente Sonner

const Toaster = ({ ...props }: ToasterProps) => {
  // Componente funcional que encapsula o Toaster do Sonner
  const { theme = "system" } = useTheme() 
  // Obtém o tema atual (default "system" se não definido)

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]} 
      // Aplica o tema atual ao componente Toaster

      className="toaster group" 
      // Classe CSS para estilização, podendo usar estados em grupo

      toastOptions={{
        // Configurações personalizadas para as notificações (toasts)
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          // Estilo da caixa do toast com base no tema e estado de grupo
          description: "group-[.toast]:text-muted-foreground",
          // Estilo da descrição do toast
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          // Estilo do botão de ação no toast
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          // Estilo do botão de cancelamento no toast
        },
      }}
      {...props} 
      // Repasse de quaisquer outras props para o componente Sonner Toaster
    />
  )
}

export { Toaster, toast } 
// Exporta o componente Toaster e a função toast para uso em outras partes da aplicação
