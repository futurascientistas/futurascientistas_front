// Importa o hook personalizado que fornece os toasts ativos
import { useToast } from "../../hooks/use-toast"

// Importa os componentes do sistema de toast
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "../../components/ui/toast"

// Componente responsável por renderizar os toasts ativos na tela
export function Toaster() {
  // Obtém a lista de toasts ativos do hook personalizado
  const { toasts } = useToast()

  return (
    // Provider necessário para o funcionamento dos toasts
    <ToastProvider>
      {/* Mapeia cada toast da lista e o renderiza */}
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}> {/* Componente principal de toast */}
            <div className="grid gap-1">
              {/* Exibe o título do toast, se houver */}
              {title && <ToastTitle>{title}</ToastTitle>}
              {/* Exibe a descrição do toast, se houver */}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {/* Se houver uma ação definida no toast (ex: botão "Desfazer") */}
            {action}
            {/* Botão para fechar o toast manualmente */}
            <ToastClose />
          </Toast>
        )
      })}
      {/* Define onde os toasts aparecem na tela */}
      <ToastViewport />
    </ToastProvider>
  )
}
