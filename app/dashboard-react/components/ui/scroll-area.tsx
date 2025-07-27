import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area" // Importa componentes de área com scroll da Radix UI

import { cn } from "../../lib/utils" // Função utilitária para combinar classes CSS condicionalmente

// Componente principal que engloba a área de scroll customizada
const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>, // Tipo do elemento referenciado (div raiz)
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> // Props padrão do Root sem a ref
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn("relative overflow-hidden", className)} // Container com overflow oculto e posição relativa
    {...props}
  >
    {/* Viewport que limita a área visível do conteúdo rolável */}
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
      {children} {/* Conteúdo rolável passado como filhos */}
    </ScrollAreaPrimitive.Viewport>

    {/* Barra de scroll customizada */}
    <ScrollBar />

    {/* Elemento visual para o canto onde as barras se encontram */}
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
))
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName // Nome para facilitar debug

// Componente para a barra de scroll (pode ser vertical ou horizontal)
const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>, // Tipo do elemento scrollbar
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar> // Props padrão sem ref
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation} // Orientação da barra (vertical ou horizontal)
    className={cn(
      "flex touch-none select-none transition-colors", // Estilos básicos da barra
      orientation === "vertical" &&
        "h-full w-2.5 border-l border-l-transparent p-[1px]", // Estilo específico para barra vertical
      orientation === "horizontal" &&
        "h-2.5 flex-col border-t border-t-transparent p-[1px]", // Estilo específico para barra horizontal
      className // Classes adicionais passadas via props
    )}
    {...props}
  >
    {/* O "polegar" da barra de scroll, a parte que o usuário arrasta */}
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName // Nome para facilitar debug

// Exporta os componentes para uso em outros arquivos
export { ScrollArea, ScrollBar }
