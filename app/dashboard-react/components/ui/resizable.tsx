import { GripVertical } from "lucide-react" // Ícone usado para o handle de redimensionamento
import * as ResizablePrimitive from "react-resizable-panels" // Biblioteca para painéis redimensionáveis

import { cn } from "../../lib/utils" // Função utilitária para combinar classes CSS

// Componente que agrupa os painéis redimensionáveis
const ResizablePanelGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => (
  <ResizablePrimitive.PanelGroup
    className={cn(
      // Define layout flexível horizontal, e se for vertical, organiza colunas
      "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
      className
    )}
    {...props}
  />
)

// Componente painel individual dentro do grupo redimensionável
const ResizablePanel = ResizablePrimitive.Panel

// Componente que representa a "barrinha" que o usuário pode arrastar para redimensionar os painéis
const ResizableHandle = ({
  withHandle, // Se true, exibe um indicador visual no handle
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean
}) => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(
      // Estilos base para a barra de redimensionamento, que muda dependendo da direção do grupo
      "relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1",
      "data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full",
      "data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0",
      // Gira o ícone de grip quando está em grupo vertical
      "[&[data-panel-group-direction=vertical]>div]:rotate-90",
      className
    )}
    {...props}
  >
    {withHandle && (
      // Indicador visual para o usuário arrastar, usando o ícone GripVertical
      <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
        <GripVertical className="h-2.5 w-2.5" />
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
)

// Exporta os componentes para uso externo
export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
