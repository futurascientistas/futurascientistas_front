// Importa o React para criação de componentes e uso de refs
import * as React from "react"

// Importa função utilitária para juntar classes CSS dinamicamente
import { cn } from "../../lib/utils"

// Componente principal Card: container com borda, fundo e sombra
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      // Estilização padrão do card: borda arredondada, cor de fundo, cor do texto e sombra
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card" // Nome do componente para debug

// Componente para o cabeçalho do card (usado para título e descrição)
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)} // Layout vertical com espaçamento e padding
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

// Componente para o título do card
const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      // Título grande, negrito e com espaçamento ajustado
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

// Componente para a descrição do card
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)} // Texto menor e cor secundária
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

// Componente para o conteúdo principal do card
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} /> // Padding padrão, sem padding-top
))
CardContent.displayName = "CardContent"

// Componente para o rodapé do card (usado para ações ou informações extras)
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)} // Layout horizontal, alinhamento central e padding
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

// Exporta todos os componentes para uso externo
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }