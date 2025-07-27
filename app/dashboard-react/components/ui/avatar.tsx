// Importa o React e suas APIs para criação de componentes e refs
import * as React from "react"
// Importa os componentes primitivos de Avatar da Radix UI
import * as AvatarPrimitive from "@radix-ui/react-avatar"

// Importa função utilitária para juntar classes CSS dinamicamente
import { cn } from "../../lib/utils"

// Componente principal de Avatar, serve como container para imagem ou fallback
const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      // Estilização padrão: tamanho, formato circular, overflow e posicionamento
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName // Define o nome do componente para debug

// Componente para exibir a imagem do avatar
const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)} // Imagem ocupa todo o espaço do container
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

// Componente de fallback, exibido quando a imagem não carrega
const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      // Estilização: centraliza conteúdo, formato circular, fundo neutro
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

// Exporta os componentes para uso externo
export { Avatar, AvatarImage, AvatarFallback }