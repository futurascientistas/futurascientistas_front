import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider" 
// Importa os componentes base do Slider da biblioteca Radix UI

import { cn } from "../../lib/utils" 
// Importa função para combinar classes CSS condicionalmente

// Componente Slider criado com React.forwardRef para passar referência ao elemento raiz do slider
const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>, // Tipo do elemento referenciado
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> // Props do componente Slider sem a ref
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref} // Referência passada para o elemento raiz do Slider
    className={cn(
      "relative flex w-full touch-none select-none items-center", // Estilos básicos: container flexível, sem seleção e toque personalizado
      className // Classes adicionais passadas via prop
    )}
    {...props} // Outros props repassados ao elemento raiz
  >
    {/* Track do slider: faixa de fundo por onde o thumb se movimenta */}
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
      {/* Range: parte preenchida do slider que indica valor selecionado */}
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>

    {/* Thumb: elemento que o usuário arrasta para ajustar o valor */}
    <SliderPrimitive.Thumb 
      className="block h-5 w-5 rounded-full border-2 border-primary bg-background 
                 ring-offset-background transition-colors 
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
                 disabled:pointer-events-none disabled:opacity-50" 
    />
  </SliderPrimitive.Root>
))

// Define o displayName para facilitar o debug no React DevTools
Slider.displayName = SliderPrimitive.Root.displayName

// Exporta o componente Slider para uso externo
export { Slider }
