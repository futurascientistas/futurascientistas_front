import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover" // Importa os componentes do Popover da Radix UI

import { cn } from "../../lib/utils" // Utilitário para combinar classes condicionalmente

// Componente raiz do Popover (controla abertura/fechamento)
const Popover = PopoverPrimitive.Root

// Elemento que dispara a abertura do Popover (pode ser um botão, por exemplo)
const PopoverTrigger = PopoverPrimitive.Trigger

// Componente que renderiza o conteúdo flutuante do Popover
const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>, // Tipo do elemento referenciado
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> // Props sem ref
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal> {/* Garante que o conteúdo será renderizado no topo da DOM */}
    <PopoverPrimitive.Content
      ref={ref}
      align={align} // Alinhamento horizontal em relação ao trigger
      sideOffset={sideOffset} // Distância entre o trigger e o conteúdo
      className={cn(
        "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none", // Estilo base do popover
        "data-[state=open]:animate-in data-[state=closed]:animate-out", // Animações de entrada e saída
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", // Fade
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95", // Zoom
        "data-[side=bottom]:slide-in-from-top-2", // Direções de entrada baseadas na posição
        "data-[side=left]:slide-in-from-right-2",
        "data-[side=right]:slide-in-from-left-2",
        "data-[side=top]:slide-in-from-bottom-2",
        className // Permite adicionar classes extras via props
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName // Nome do componente para debug

// Exporta os componentes para uso em outros arquivos
export { Popover, PopoverTrigger, PopoverContent }
