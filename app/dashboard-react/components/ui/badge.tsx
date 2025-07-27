// Importa o React para criação de componentes
import * as React from "react"
// Importa a função cva para criar variações de classes CSS e o tipo VariantProps
import { cva, type VariantProps } from "class-variance-authority"

// Importa função utilitária para juntar classes CSS dinamicamente
import { cn } from "../../lib/utils"

// Define as variações de estilo para o componente Badge usando cva
const badgeVariants = cva(
  // Classes base para o badge: layout, borda, padding, fonte, transições e foco
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        // Variante padrão: fundo e texto primário
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        // Variante secundária: fundo e texto secundário
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        // Variante destrutiva: fundo e texto de erro
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        // Variante outline: apenas texto, sem fundo
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default", // Define a variante padrão como "default"
    },
  }
)

// Define as propriedades aceitas pelo componente Badge
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>, // Permite todas as props de uma div
    VariantProps<typeof badgeVariants> {}       // Permite passar a variante

// Componente Badge: exibe um selo/etiqueta estilizado
function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    // Aplica as classes de variante e extras recebidas via props
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

// Exporta o componente Badge e as variações para uso externo
export { Badge, badgeVariants }