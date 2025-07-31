import API_ENDPOINTS from "@/lib/externalApi/endpoints";
import { objectToFormData } from "@/utils/objectToFormData";
import axios from "axios";

export async function login(cpf: string, senha: string) {
  try {
    const response = await axios.post(
      API_ENDPOINTS.AUTH_LOGIN,
      {
        cpf: cpf,
        senha: senha,
      },
      {
        withCredentials: true,
      }
    );

    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      message:
        error.response?.data?.detail ||
        error.response?.data?.message ||
        error.response?.data?.mensagem ||
        error.message ||
        "Erro desconhecido",
    };
  }
}

export async function recoverPassword(
  cpf: string
): Promise<{ success: boolean; message: string }> {
  try {
    const response = await axios.post(API_ENDPOINTS.AUTH_RECOVER_PASSWORD, {
      cpf: cpf,
    });

    if (response.status === 200) {
      return {
        success: true,
        message: "Link de recuperação enviado para seu e-mail.",
      };
    } else {
      return {
        success: false,
        message: "Não foi possível enviar o link de recuperação.",
      };
    }
  } catch (error: any) {
    if (error.response?.data.mensagem) {
      return { success: false, message: error.response?.data.mensagem };
    }
    return { success: false, message: "Erro ao conectar com o servidor." };
  }
}

export async function resetPassword(
  new_password: string
): Promise<{ success: boolean; message?: string }> {
  try {
    const response = await axios.post(
      API_ENDPOINTS.AUTH_UPDATE_PASSWORD,
      { new_password: new_password },
      {
        withCredentials: true,
      }
    );
    return { success: true, message: response.data.message };
  } catch (error: any) {
    return {
      success: false,
      message:
        error.response?.data?.detail ||
        error.response?.data?.message ||
        error.response?.data?.mensagem ||
        error.message ||
        "Erro desconhecido",
    };
  }
}

// Create user
export async function register(userData: any): Promise<{ success: boolean; message?: string }> {
  
  try {
    const headers = {
      'Content-Type': 'multipart/form-data',
    }
    const formData = objectToFormData(userData);

    const response = await axios.post(API_ENDPOINTS.AUTH_CADASTRO, formData, { headers });
    return { success: true, message: response.data.message };
  } catch (error: any) {
    return {
      success: false,
      message:
        error.response?.data?.detail ||
        error.response?.data?.message ||
        error.response?.data?.mensagem ||
        error.message ||
        'Erro desconhecido',
    };
  }
}