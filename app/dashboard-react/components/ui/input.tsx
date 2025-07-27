// Importa tudo do React (incluindo hooks, tipos, etc.)
import * as React from "react"

// Importa a função `cn` de utilitário para concatenar classes CSS
import { cn } from "../../lib/utils"

// Define um componente funcional chamado Input utilizando `React.forwardRef`
// Isso permite que um ref (referência) seja passado para o elemento <input>, o que é útil para focar programaticamente, por exemplo.
const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  // Desestrutura as props recebidas: `className`, `type` e o restante via `...props`
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type} // Define o tipo do input (text, email, password, etc.)
        ref={ref}   // Conecta o ref passado ao elemento <input>
        className={cn(
          // Classes Tailwind CSS que estilizam o input
          // h-10: altura; w-full: largura total; border; padding; background, etc.
          // Também estiliza os arquivos (para inputs do tipo file), e lida com estados como foco e desabilitado
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className // Permite adicionar classes personalizadas por fora
        )}
        {...props} // Passa quaisquer outras props para o <input> (por exemplo, `placeholder`, `value`, `onChange`, etc.)
      />
    )
  }
)

// Define um nome de exibição para o componente (útil em DevTools)
Input.displayName = "Input"

// Exporta o componente Input para ser usado em outros arquivos
export { Input }
