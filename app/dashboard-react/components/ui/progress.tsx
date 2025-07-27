import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress" // Importa os componentes de progresso da Radix UI

import { cn } from "../../lib/utils" // Função utilitária para combinar classes condicionalmente

// Componente de barra de progresso customizado
const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>, // Tipo do elemento referenciado (div)
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> // Props sem a ref
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary", // Estilo da trilha da barra
      className
    )}
    {...props}
  >
    {/* Indicador da barra de progresso, com transição suave */}
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all" // Estilo do indicador
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }} // Move o indicador conforme o valor
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName // Nome amigável para debug

// Exporta o componente de progresso para uso em outras partes da aplicação
export { Progress }
