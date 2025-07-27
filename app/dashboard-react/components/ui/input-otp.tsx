// Importa o React para criação de componentes e uso de refs
import * as React from "react"
// Importa o componente OTPInput e o contexto OTPInputContext da biblioteca input-otp
import { OTPInput, OTPInputContext } from "input-otp"
// Importa o ícone Dot do Lucide para usar como separador visual
import { Dot } from "lucide-react"

// Importa função utilitária para juntar classes CSS dinamicamente
import { cn } from "../../lib/utils"

// Componente principal de input OTP, estilizado e com suporte a refs
const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
  <OTPInput
    ref={ref}
    containerClassName={cn(
      // Layout flexível, alinhamento e opacidade para campos desabilitados
      "flex items-center gap-2 has-[:disabled]:opacity-50",
      containerClassName
    )}
    className={cn("disabled:cursor-not-allowed", className)}
    {...props}
  />
))
InputOTP.displayName = "InputOTP"

// Componente para agrupar os campos do OTP em uma linha
const InputOTPGroup = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center", className)} {...props} />
))
InputOTPGroup.displayName = "InputOTPGroup"

// Componente para cada slot/campo individual do OTP
const InputOTPSlot = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & { index: number }
>(({ index, className, ...props }, ref) => {
  // Obtém o contexto do OTP para acessar o estado do slot
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index]

  return (
    <div
      ref={ref}
      className={cn(
        // Estilização: bordas, tamanho, foco e arredondamento
        "relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
        isActive && "z-10 ring-2 ring-ring ring-offset-background",
        className
      )}
      {...props}
    >
      {/* Exibe o caractere digitado */}
      {char}
      {/* Exibe o cursor animado se necessário */}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      )}
    </div>
  )
})
InputOTPSlot.displayName = "InputOTPSlot"

// Componente separador visual entre os campos do OTP
const InputOTPSeparator = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ ...props }, ref) => (
  <div ref={ref} role="separator" {...props}>
    <Dot />
  </div>
))
InputOTPSeparator.displayName = "InputOTPSeparator"

// Exporta todos os componentes para uso externo
export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }