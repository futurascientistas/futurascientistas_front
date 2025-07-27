// Importa React e os componentes de toggle da Radix UI
import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"

// Importa a função `cva` (Class Variance Authority) para criar variações de estilos
import { cva, type VariantProps } from "class-variance-authority"

// Função utilitária para combinar classes CSS
import { cn } from "../../lib/utils"

// Define os estilos variantes para o botão toggle
const toggleVariants = cva(
  // Classes base que todo toggle terá
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
  {
    // Define variações de aparência
    variants: {
      variant: {
        default: "bg-transparent", // Variante sem borda
        outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground", // Variante com borda
      },
      size: {
        default: "h-10 px-3",  // Tamanho padrão
        sm: "h-9 px-2.5",      // Pequeno
        lg: "h-11 px-5",       // Grande
      },
    },
    // Define os valores padrão
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

// Componente de botão Toggle
const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>, // Tipo do elemento nativo referenciado
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> & // Props padrão do componente
    VariantProps<typeof toggleVariants> // Tipagem dos estilos variantes
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    // Aplica os estilos base + variantes + classes adicionais via `cn`
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
))

// Define o nome de exibição no DevTools
Toggle.displayName = TogglePrimitive.Root.displayName

// Exporta o componente Toggle e os estilos variantes (úteis para composição)
export { Toggle, toggleVariants }
