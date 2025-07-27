// Importa o React para criação de componentes e uso de refs
import * as React from "react"
// Importa os componentes primitivos de Checkbox da Radix UI
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
// Importa o ícone de check do Lucide para exibir quando marcado
import { Check } from "lucide-react"

// Importa função utilitária para juntar classes CSS dinamicamente
import { cn } from "../../lib/utils"

// Componente Checkbox customizado, estilizado e acessível
const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      // Estilização padrão: tamanho, borda, foco, estados de desabilitado e marcado
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    )}
    {...props}
  >
    {/* Indicador do checkbox, exibe o ícone de check quando marcado */}
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName // Nome do componente para debug

// Exporta o componente Checkbox para uso externo
export { Checkbox }