import * as React from "react" // Importa o React e suas APIs
import * as AccordionPrimitive from "@radix-ui/react-accordion" // Importa os componentes primitivos de Accordion da Radix UI
import { ChevronDown } from "lucide-react" // Importa o ícone ChevronDown
import { cn } from "../../lib/utils" // Importa função utilitária para juntar classes CSS

// Reexporta o componente raiz do Accordion da Radix UI
const Accordion = AccordionPrimitive.Root

// Componente AccordionItem: representa um item do acordeão
const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b", className)} // Adiciona borda inferior e classes extras
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem" // Define o nome do componente para debug

// Componente AccordionTrigger: botão que abre/fecha o item do acordeão
const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        // Estilização padrão e rotação do ícone quando aberto
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      {/* Ícone que gira ao abrir o acordeão */}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName // Mantém o nome do componente para debug

// Componente AccordionContent: conteúdo que aparece ao abrir o item
const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    {/* Conteúdo com padding personalizado */}
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName // Mantém o nome do componente para debug

// Exporta todos os componentes customizados para uso externo
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }