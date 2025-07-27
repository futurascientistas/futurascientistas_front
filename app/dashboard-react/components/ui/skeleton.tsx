import { cn } from "../../lib/utils" 
// Importa a função 'cn' que combina classes CSS de forma condicional

// Componente funcional Skeleton que recebe props de um div HTML padrão
function Skeleton({
  className, // Classes CSS adicionais que podem ser passadas para o componente
  ...props    // Outros atributos HTML que podem ser passados para o div
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      // Aplica classes base para efeito de skeleton: animação de pulsar, cantos arredondados e cor de fundo "muted"
      // Além disso, combina com quaisquer classes extras passadas via prop className
      className={cn("animate-pulse rounded-md bg-muted", className)} 
      {...props} // Espalha outras propriedades no div
    />
  )
}

export { Skeleton }
// Exporta o componente Skeleton para uso em outras partes da aplicação
