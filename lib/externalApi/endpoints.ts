const API_ENDPOINTS = {
  PROJETOS: '/projetos/',
  PROJETOS_TODOS: '/projetos/todos/',
  PROJETOS_CRIAR: '/projetos/criar/',
  REGIOES: '/api/regioes/',
  ESTADOS: '/api/estados/',
  
  AUTH_USUARIO: '/usuarios/auth/',
  AUTH_PROFILE: '/usuarios/auth/profile/',
  AUTH_CADASTRO: '/usuarios/auth/cadastro/',
  AUTH_LOGIN: '/usuarios/auth/login/',
  AUTH_LOGOUT: '/usuarios/auth/logout/',
  AUTH_RECOVER_PASSWORD: '/usuarios/auth/recuperacao_senha/',
  AUTH_UPDATE_PASSWORD: '/usuarios/auth/atualizar_senha/',
  USUARIOS_GRUPOS_DEFAULT: '/usuarios/grupos/default/',

  projetoPorID: (id: string) => `${process.env.NEXT_PUBLIC_API_URL}/projetos/projeto/${id}/`,
  atualizarProjeto: (id: string) => `${process.env.NEXT_PUBLIC_API_URL}/projetos/atualizar/${id}/`,
  
  regiaoPorID:(id: number) => `${process.env.NEXT_PUBLIC_API_URL}/api/regioes/${id}/`,
  estadoPorID: (id: number) => `${process.env.NEXT_PUBLIC_API_URL}/api/estados/${id}/`,
  cidadePorID:(id: number) => `${process.env.NEXT_PUBLIC_API_URL}/api/cidades/${id}/`,
  cidadesPorEstado: (uf: string) => `${process.env.NEXT_PUBLIC_API_URL}/api/estados/${uf}/cidades`,
  
  userPorID: (id: string) => `${process.env.NEXT_PUBLIC_API_URL}/usuarios/${id}/`,
  membrosPorGrupo: (groupName: string) => `${process.env.NEXT_PUBLIC_API_URL}/usuarios/grupos/${groupName}/membros`,
};

export default API_ENDPOINTS;
