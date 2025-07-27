import * as SheetPrimitive from "@radix-ui/react-dialog" // Importa componentes do diálogo da Radix UI, usado para criar o Sheet (painel deslizante)
import { cva, type VariantProps } from "class-variance-authority" // Ferramenta para gerenciar variantes CSS
import { X } from "lucide-react" // Ícone X para botão de fechar
import * as React from "react"

import { cn } from "../../lib/utils" // Função para combinar classes CSS condicionalmente

// Componente raiz do Sheet que controla seu estado (aberto/fechado)
const Sheet = SheetPrimitive.Root

// Componente que dispara a abertura do Sheet (por exemplo, um botão)
const SheetTrigger = SheetPrimitive.Trigger

// Componente para fechar o Sheet (geralmente um botão)
const SheetClose = SheetPrimitive.Close

// Portal para renderizar o conteúdo do Sheet fora da hierarquia normal do DOM
const SheetPortal = SheetPrimitive.Portal

// Overlay escuro que aparece atrás do Sheet quando aberto
const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    ref={ref}
    className={cn(
      // Estilos do overlay: fixo, ocupa toda tela, fundo preto semi-transparente
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out " +
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName

// Variantes de estilo para o conteúdo do Sheet dependendo do lado onde ele aparece
const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out " +
    "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        // Animações e posições específicas para cada lado (top, bottom, left, right)
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right", // Valor padrão para o lado do Sheet
    },
  }
)

// Props do componente SheetContent, incluindo variantes de estilo do cva
interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

// Componente que exibe o conteúdo do Sheet com animações e controle de posicionamento
const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, ...props }, ref) => (
  <SheetPortal> {/* Renderiza fora da árvore DOM principal para evitar problemas de z-index */}
    <SheetOverlay /> {/* Overlay atrás do conteúdo */}
    <SheetPrimitive.Content
      ref={ref}
      className={cn(sheetVariants({ side }), className)} // Aplica variantes de estilo baseado no lado e classes extras
      {...props}
    >
      {children}
      {/* Botão de fechar fixo no canto superior direito do Sheet */}
      <SheetPrimitive.Close
        className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity
        hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none
        data-[state=open]:bg-secondary"
      >
        <X className="h-4 w-4" /> {/* Ícone de X */}
        <span className="sr-only">Close</span> {/* Texto oculto para leitores de tela */}
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPortal>
))
SheetContent.displayName = SheetPrimitive.Content.displayName

// Cabeçalho do Sheet, geralmente para título ou elementos importantes
const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left", // Estilo flexível e responsivo
      className
    )}
    {...props}
  />
)
SheetHeader.displayName = "SheetHeader"

// Rodapé do Sheet, geralmente para botões de ação
const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", // Layout flexível com responsividade
      className
    )}
    {...props}
  />
)
SheetFooter.displayName = "SheetFooter"

// Título do Sheet com estilo padrão
const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold text-foreground", className)} // Fonte maior e em destaque
    {...props}
  />
))
SheetTitle.displayName = SheetPrimitive.Title.displayName

// Descrição do Sheet com estilo de texto secundário
const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)} // Texto menor e com cor de mutado
    {...props}
  />
))
SheetDescription.displayName = SheetPrimitive.Description.displayName

// Exporta todos os componentes para uso externo
export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
}
