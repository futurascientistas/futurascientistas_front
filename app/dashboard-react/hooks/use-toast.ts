// Importa o React
import * as React from "react"

// Importa os tipos necessários dos componentes de toast
import type {
  ToastActionElement,
  ToastProps,
} from "../components/ui/toast"

// Limita a quantidade de toasts simultâneos exibidos
const TOAST_LIMIT = 1

// Tempo até um toast ser removido (em ms) após ser fechado
const TOAST_REMOVE_DELAY = 1000000

// Define a estrutura de um toast (notificação)
type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

// Enum com os tipos de ação possíveis no sistema de toasts
const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

// Contador global para gerar IDs únicos
let count = 0

// Gera um ID único incremental
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

// Tipos das ações possíveis (baseado em `actionTypes`)
type ActionType = typeof actionTypes

// Definição das ações que o reducer pode manipular
type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: ToasterToast["id"]
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: ToasterToast["id"]
    }

// Estado da aplicação relacionado aos toasts
interface State {
  toasts: ToasterToast[]
}

// Mapeia os timeouts ativos para remover toasts posteriormente
const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

// Adiciona um toast à fila de remoção com atraso
const addToRemoveQueue = (toastId: string) => {
  // Se já está na fila, não faz nada
  if (toastTimeouts.has(toastId)) {
    return
  }

  // Define timeout para remover o toast após o tempo definido
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

// Função principal de atualização de estado com base nas ações
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    // Adiciona um novo toast e respeita o limite
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    // Atualiza um toast existente
    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    // Marca um toast como "fechado" e agenda remoção
    case "DISMISS_TOAST": {
      const { toastId } = action

      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }

    // Remove um toast permanentemente do estado
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

// Lista de funções a serem chamadas sempre que o estado mudar
const listeners: Array<(state: State) => void> = []

// Estado em memória (fora do React), para compartilhar entre componentes
let memoryState: State = { toasts: [] }

// Função global para despachar ações e atualizar todos os ouvintes
function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

// Tipo do toast que será criado (sem o ID, que é gerado automaticamente)
type Toast = Omit<ToasterToast, "id">

// Função para criar um toast
function toast({ ...props }: Toast) {
  const id = genId()

  // Atualiza um toast com novo conteúdo
  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    })

  // Fecha um toast
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  // Adiciona o toast ao estado
  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id: id,
    dismiss,
    update,
  }
}

// Hook React para acessar e reagir ao estado dos toasts
function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  // Adiciona a função `setState` 
  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}

// Exporta o hook e a função `toast` para uso externo
export { useToast, toast }
