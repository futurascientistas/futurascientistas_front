// Importa React e os componentes de Tooltip da biblioteca Radix UI
import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

// Importa a função utilitária para combinar classes CSS condicionalmente
import { cn } from "../../lib/utils"

// Provedor de contexto global para tooltips (gerencia o estado de múltiplos tooltips)
const TooltipProvider = TooltipPrimitive.Provider

// Componente raiz que encapsula o tooltip (envolve o trigger e o conteúdo)
const Tooltip = TooltipPrimitive.Root

// Componente que define qual elemento vai disparar o tooltip ao passar o mouse/foco
const TooltipTrigger = TooltipPrimitive.Trigger

// Componente que define o conteúdo visível do tooltip
const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>, // Tipo do elemento referenciado
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> // Props sem ref
>(
  ({ className, sideOffset = 4, ...props }, ref) => (
    <TooltipPrimitive.Content
      ref={ref} // Referência ao DOM
      sideOffset={sideOffset} // Espaçamento entre o trigger e o tooltip
      className={cn(
        // Classes de estilo e animação do tooltip
        "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
        "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className // Permite sobrescrever estilos via props
      )}
      {...props} // Outras propriedades do componente
    />
  )
)
TooltipContent.displayName = TooltipPrimitive.Content.displayName

// Exporta os componentes para uso em outros lugares do projeto
export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
