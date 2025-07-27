// Importa o React para criação de componentes e uso de refs
import * as React from "react"
// Importa os componentes primitivos de HoverCard da Radix UI
import * as HoverCardPrimitive from "@radix-ui/react-hover-card"

// Importa função utilitária para juntar classes CSS dinamicamente
import { cn } from "../../lib/utils"

// Componente raiz do HoverCard (container principal)
const HoverCard = HoverCardPrimitive.Root

// Componente que dispara a abertura do HoverCard ao passar o mouse
const HoverCardTrigger = HoverCardPrimitive.Trigger

// Componente para o conteúdo exibido no HoverCard, com estilização e animações
const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={cn(
      // Estilização padrão: largura, borda, fundo, sombra, animações e responsividade
      "z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName

// Exporta os componentes para uso externo
export { HoverCard, HoverCardTrigger, HoverCardContent }