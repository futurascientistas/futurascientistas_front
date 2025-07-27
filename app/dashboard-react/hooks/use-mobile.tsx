// Importa todas as funcionalidades do React, incluindo useState e useEffect
import * as React from "react"

// Define o valor de referência para o breakpoint "mobile"
// Ou seja, qualquer largura menor que 768px será considerada como um dispositivo móvel
const MOBILE_BREAKPOINT = 768

// Hook personalizado que retorna um booleano indicando se o dispositivo é mobile
export function useIsMobile() {
  // Estado que armazena se o dispositivo é mobile ou não
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  // Efeito que roda uma vez ao montar o componente
  React.useEffect(() => {
    // Cria um MediaQueryList que observa se a largura da tela é menor que o breakpoint
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)

    // Função chamada sempre que a largura da tela muda
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    // Adiciona o listener para detectar mudanças na largura da tela
    mql.addEventListener("change", onChange)

    // Define o valor inicial ao montar o componente
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)

    // Remove o listener ao desmontar o componente para evitar vazamento de memória
    return () => mql.removeEventListener("change", onChange)
  }, [])

  // Retorna `true` se for mobile, `false` caso contrário
  // O operador `!!` garante que sempre será retornado um valor booleano
  return !!isMobile
}
