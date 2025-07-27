// Importa o React para criação de componentes e uso de refs
import * as React from "react"
// Importa o Slot da Radix UI para permitir composição flexível de componentes
import { Slot } from "@radix-ui/react-slot"
// Importa a função cva para criar variações de classes CSS e o tipo VariantProps
import { cva, type VariantProps } from "class-variance-authority"

// Importa função utilitária para juntar classes CSS dinamicamente
import { cn } from "../../lib/utils"

// Define as variações de estilo para o componente Button usando cva
const buttonVariants = cva(
  // Classes base para o botão: layout, espaçamento, fonte, transições, foco e estados de desabilitado
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      // Variações de cor e estilo do botão
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      // Variações de tamanho do botão
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    // Define as variantes padrão
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

// Define as propriedades aceitas pelo componente Button
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, // Permite todas as props de um botão padrão
    VariantProps<typeof buttonVariants> {                // Permite passar variante e tamanho
  asChild?: boolean // Permite renderizar como outro componente usando Slot
}

// Componente Button: exibe um botão estilizado e flexível
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    // Permite renderizar como outro componente se asChild for true
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button" // Nome do componente para debug

// Exporta o componente Button e as variações para uso externo
export { Button, buttonVariants }   