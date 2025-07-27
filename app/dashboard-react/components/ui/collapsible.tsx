// Importa os componentes primitivos de Collapsible da Radix UI
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

// Cria um alias para o componente raiz do Collapsible (container principal)
const Collapsible = CollapsiblePrimitive.Root

// Cria um alias para o componente que dispara a abertura/fechamento do conteúdo
const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger

// Cria um alias para o componente que representa o conteúdo colapsável
const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent

// Exporta os componentes para uso externo
export { Collapsible, CollapsibleTrigger, CollapsibleContent }