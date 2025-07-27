// Importa o React e o sistema de toggle group da Radix UI
import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import { type VariantProps } from "class-variance-authority"

// Importa função utilitária para concatenar classes
import { cn } from "../../lib/utils"
// Importa os estilos variantes dos botões de toggle
import { toggleVariants } from "../../components/ui/toggle"

// Cria um contexto para passar as variantes (estilo e tamanho) para os filhos
const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants>
>({
  size: "default",    // Tamanho padrão
  variant: "default", // Estilo visual padrão
})

// Componente raiz do grupo de toggles (pode ser múltiplo ou único)
const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> & // Props do Radix
    VariantProps<typeof toggleVariants> // Props de estilo e tamanho
>(({ className, variant, size, children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cn("flex items-center justify-center gap-1", className)} // Estilização base + personalização
    {...props}
  >
    {/* Fornece as variantes para os filhos via contexto */}
    <ToggleGroupContext.Provider value={{ variant, size }}>
      {children}
    </ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
))

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName

// Componente individual de item do ToggleGroup (cada botão clicável)
const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
    VariantProps<typeof toggleVariants>
>(({ className, children, variant, size, ...props }, ref) => {
  // Pega os valores do contexto, se existirem
  const context = React.useContext(ToggleGroupContext)

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      // Aplica variantes visuais usando os valores do contexto ou props diretas
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        className
      )}
      {...props}
    >
      {children} {/* Conteúdo do toggle (ícone, texto, etc.) */}
    </ToggleGroupPrimitive.Item>
  )
})

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName

// Exporta os componentes para uso externo
export { ToggleGroup, ToggleGroupItem }
