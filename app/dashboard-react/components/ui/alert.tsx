import * as React from "react" // Importa o React e suas APIs
import { cva, type VariantProps } from "class-variance-authority" // Importa utilitário para variações de classe CSS

import { cn } from "../../lib/utils" // Função utilitária para juntar classes CSS

// Define as variações de estilo para o componente de alerta usando cva
const alertVariants = cva(
  // Classes base para o alerta, incluindo layout, espaçamento e posicionamento de ícones SVG
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        // Variante padrão: fundo e texto padrão
        default: "bg-background text-foreground",
        // Variante destrutiva: borda e texto em cor de erro
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default", // Define a variante padrão como "default"
    },
  }
)

// Componente principal de alerta, aceita variantes e outras props de div
const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert" // Define o papel ARIA para acessibilidade
    className={cn(alertVariants({ variant }), className)} // Aplica as classes de variante e extras
    {...props}
  />
))
Alert.displayName = "Alert" // Nome do componente para debug

// Componente para o título do alerta
const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)} // Estilização do título
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

// Componente para a descrição do alerta
const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)} // Estilização da descrição
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

// Exporta os componentes para uso externo
export { Alert, AlertTitle, AlertDescription }