import * as React from "react"
// Importa o React para criar componentes funcionais

import * as SwitchPrimitives from "@radix-ui/react-switch"
// Importa os componentes base do Switch da biblioteca Radix UI

import { cn } from "../../lib/utils"
// Importa função utilitária para combinar classes CSS condicionalmente

// Componente Switch usando forwardRef para encaminhar a ref ao elemento DOM raiz
const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>, // Tipo do elemento raiz do Switch
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> // Props sem a ref
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    // Elemento raiz do Switch (a "caixa" clicável)
    className={cn(
      // Combina classes padrão com classes extras passadas via prop className
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    )}
    {...props} // Passa todas as outras props ao elemento raiz
    ref={ref} // Encaminha a ref para o elemento raiz
  >
    <SwitchPrimitives.Thumb
      // O "polegar" do switch que se move para indicar o estado
      className={cn(
        "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
        // Estilos para o polegar, incluindo transição suave de posição ao alternar estado
      )}
    />
  </SwitchPrimitives.Root>
))

Switch.displayName = SwitchPrimitives.Root.displayName
// Define o displayName para facilitar a depuração no React DevTools

export { Switch }
// Exporta o componente Switch para ser usado em outras partes da aplicação
