// Importa tudo do React, incluindo tipos e hooks
import * as React from "react"

// Importa o componente `Label` da biblioteca Radix UI como um namespace (LabelPrimitive.Root será usado abaixo)
import * as LabelPrimitive from "@radix-ui/react-label"

// Importa a função `cva` (Class Variance Authority), usada para definir variantes de classe CSS
// `VariantProps` é um tipo utilitário que permite extrair os tipos de variações
import { cva, type VariantProps } from "class-variance-authority"

// Importa a função `cn`, provavelmente usada para concatenar e condicionar classes CSS (ex: "classNames")
import { cn } from "../../lib/utils"

// Define as classes base para o componente Label usando `cva`
// Essas classes lidam com o estilo padrão e o estado de desabilitado, usando utilitários do Tailwind CSS
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

// Cria o componente `Label` usando `forwardRef`, permitindo repassar refs para o elemento base
const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>, // Tipo do ref baseado no componente Radix
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & // Todas as props nativas do Label do Radix
    VariantProps<typeof labelVariants> // (Opcional) permite aceitar variações, se forem adicionadas
>(({ className, ...props }, ref) => (
  // Usa o Label base do Radix como o componente principal
  <LabelPrimitive.Root
    ref={ref} // repassa a ref
    className={cn(labelVariants(), className)} // aplica as classes com `cva` + classes adicionais passadas
    {...props} // repassa outras props como `htmlFor`, `children`, etc.
  />
))

// Define o nome do componente para melhor depuração (herda do Radix)
Label.displayName = LabelPrimitive.Root.displayName

// Exporta o componente para uso em outros lugares
export { Label }
