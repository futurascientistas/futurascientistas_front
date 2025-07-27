import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group" // Importa componentes do Radio Group da Radix UI
import { Circle } from "lucide-react" // Importa o ícone de círculo para o indicador do radio

import { cn } from "../../lib/utils" // Função utilitária para combinar classes CSS condicionalmente

// Componente de grupo de rádios, que envolve vários RadioGroupItem
const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>, // Tipo do elemento referenciado (div principal)
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> // Props padrão sem a ref
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)} // Layout em grade com espaçamento entre itens
      {...props}
      ref={ref}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName // Nome para facilitar debug

// Componente individual do item radio (botão de seleção)
const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>, // Tipo do elemento referenciado (input radio)
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> // Props padrão sem a ref
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary", // Formato circular e borda primária
        "ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", // Foco acessível com anel destacado
        "disabled:cursor-not-allowed disabled:opacity-50", // Estado desabilitado visual e funcional
        className
      )}
      {...props}
    >
      {/* Indicador interno que mostra o círculo preenchido quando selecionado */}
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-current text-current" /> {/* Ícone do círculo */}
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName // Nome para facilitar debug

// Exporta os componentes para uso externo
export { RadioGroup, RadioGroupItem }
