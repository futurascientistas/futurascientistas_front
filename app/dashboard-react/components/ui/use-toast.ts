// Importa o hook personalizado `useToast` e a função `toast`
// Ambos são responsáveis por lidar com o sistema de notificações (toasts) da aplicação
import { useToast, toast } from "../../hooks/use-toast";

// Reexporta `useToast` e `toast`
// Isso permite que outros arquivos importem diretamente deste módulo, facilitando a organização e reutilização
export { useToast, toast };
