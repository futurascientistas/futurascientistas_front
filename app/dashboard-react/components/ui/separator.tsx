import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator" // Importa o componente Separator da Radix UI

import { cn } from "../../lib/utils" // Função para combinar classes CSS condicionalmente

// Componente Separator personalizado com suporte a orientação e acessibilidade
const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>, // Tipo do elemento DOM referenciado
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> & { // Props aceitas pelo componente
    orientation?: "horizontal" | "vertical" // Orientação da linha separadora (horizontal ou vertical)
    decorative?: boolean // Se é apenas decorativo (para acessibilidade)
  }
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props }, // Props com valores padrão
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref} // Referência para controle direto do DOM
      decorative={decorative} // Marca se o separador é apenas decorativo (não lido por leitores de tela)
      orientation={orientation} // Define a orientação do separador
      className={cn(
        "shrink-0 bg-border", // Estilo base: não encolhe e usa cor de borda
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]", // Estilo condicional baseado na orientação
        className // Classes adicionais que podem ser passadas via props
      )}
      {...props} // Outras props passadas para o componente raiz do Radix
    />
  )
)

Separator.displayName = SeparatorPrimitive.Root.displayName // Nome para debug no React DevTools

export { Separator } // Exporta o componente para uso em outros arquivos
