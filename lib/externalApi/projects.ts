import axiosInstance from "@/lib/axios";
import { Cidade } from "@/types/cidade";
import { Estado } from "@/types/estado";
import { FiltrosProjects, Project, ProjectPayload } from "@/types/project";
import { Regiao } from "@/types/regiao";
import { EstadoApiAdapter } from "./estados"
import { RegiaoApiAdapter } from "./regioes";
import API_ENDPOINTS from "./endpoints";
import { UserApiAdapter } from "./users";

export class ProjectApiAdapter {
  constructor(private token: string) {}

  async listarProjetos(): Promise<Project[]> {
    const res = await axiosInstance.get(API_ENDPOINTS.PROJETOS_TODOS, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    
    var projetos = await Promise.all(
      res.data.map((projeto: any) => {
        return this.mapProject(projeto, this.token)
      })
    );

    projetos = projetos.filter(item => item !== undefined);

    return projetos;
  }

  private buildProjectPayload(projeto: Project) {
    // dafault values
    projeto.formato = projeto.formato.toLowerCase() || "presencial";
    projeto.ehRemoto = projeto.ehRemoto || false;
    projeto.regioesAceitas = projeto.regioesAceitas || [];
    
    // Projeto Remoto e Presencial devem preencher região
    var regioes_aceitas = "";
    regioes_aceitas = projeto.regiao.id.toString();

    var inicio_inscricoes = projeto.inicioInscricoes;
    var fim_inscricoes = projeto.fimInscricoes;
    var cidades_aceitas = projeto.cidade ? projeto.cidade.id.toString() : "";
    var estados_aceitos = projeto.estado ? projeto.estado.id.toString() : "";
    var tutora_id = projeto.tutor ? projeto.tutor.id.toString() : "";

    const payload: ProjectPayload = {
      "nome": projeto.nome,
      "descricao": projeto.descricao,
      "eh_remoto": projeto.ehRemoto,
      "vagas": projeto.vagas,
      "data_inicio": projeto.dataInicio,
      "data_fim": projeto.dataFim,
      "inicio_inscricoes": inicio_inscricoes,
      "fim_inscricoes": fim_inscricoes,
      "regioes_aceitas": regioes_aceitas,
      "formato": projeto.formato,
      "tutora": tutora_id,
      "cidades_aceitas": cidades_aceitas,
      "estados_aceitos": estados_aceitos,
    };

    return payload;
  }

  async criarProjeto(projeto: Project): Promise<Project> {
    var payload = this.buildProjectPayload(projeto)

    const res = await axiosInstance.post(API_ENDPOINTS.PROJETOS_CRIAR, payload, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return this.mapProject(res.data, this.token);
  }

  async getProjetoPorId(id: string): Promise<Project> {
    const res = await axiosInstance.get(API_ENDPOINTS.projetoPorID(id), {
      headers: { Authorization: `Bearer ${this.token}` },
    });

    return this.mapProject(res.data, this.token);
  }

  async atualizarProjeto(id: string, projeto: Project): Promise<Project> {
    const payload = this.buildProjectPayload(projeto)
    const res = await axiosInstance.put(API_ENDPOINTS.atualizarProjeto(id), payload, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return this.mapProject(res.data, this.token); 
  }

  private async mapProject(data: any, token: any): Promise<Project> {
    var estado = data.estados_aceitos_obj[0];
    var cidade = data.cidades_aceitas_obj[0];
    var regiao = data.regioes_aceitas_obj[0];
    var tutor = data.tutora;
    var dataInicio = data.data_inicio ? data.data_inicio.split("T")[0] : "";
    var dataFim = data.data_fim ? data.data_fim.split("T")[0] : "";
    var dataInicioInscricao = data.inicio_inscricoes ? data.inicio_inscricoes.split("T")[0] : "";
    var dataFimInscricao = data.fim_inscricoes ? data.fim_inscricoes.split("T")[0] : "";

    var regiaoAPI = new RegiaoApiAdapter(token);
    var estadoAPI = new EstadoApiAdapter(token);
    var userAPI = new UserApiAdapter(token);

    const getSafe = async (fn: () => Promise<any>) => {
      try {
        return await fn();
      } catch (e) {
        console.warn("Erro ao buscar dados relacionados:", e);
        return null;
      }
    };

    const regiaoObj = regiao ? await getSafe(() => regiaoAPI.obterRegiaoPorId(regiao)) : null;
    const estadoObj = estado ? await getSafe(() => estadoAPI.obterEstadoPorId(estado)) : null;
    const cidadeObj = cidade ? await getSafe(() => estadoAPI.obterCidadePorId(cidade)) : null;
    const tutorObj = tutor ? await getSafe(() => userAPI.obterUserPorId(tutor)) : null;

    
    var proj = {
      id: data.id,
      nome: data.nome,
      descricao: data.descricao,
      criadoPor: data.criado_por,
      atualizadoPor: data.atualizado_por,
      ehRemoto: data.eh_remoto,
      formato: data.formato,
      status: data.status,
      vagas: data.vagas,
      ativo: data.ativo,
      inicioInscricoes: dataInicioInscricao,
      fimInscricoes: dataFimInscricao,
      dataInicio: dataInicio,
      dataFim: dataFim,
      criadoEm: data.criado_em,
      atualizadoEm: data.atualizado_em,
      regioesAceitas: data.regioes_aceitas_obj.map(
        (nome: string): Regiao => ({
          nome,
          id: 0,
          abreviacao: "",
          descricao: "",
        })
      ),
      estadosAceitos: data.estados_aceitos_obj.map(
        (estado: any): Estado => ({
          id: estado.id,
          nome: estado.nome,
          uf: "",
          regiao: estado.regiao,
        })
      ),
      cidadesAceitas: data.cidades_aceitas_obj.map(
        (cidade: any): Cidade => ({
          id: cidade.id,
          nome: cidade.nome,
          estado: cidade.estado,
        })
      ),
      regiaoID: regiao,
      estadoID: estado,
      cidadeID: cidade,
      tutorID: tutor,
      instituicao: data.instituicao?? "",
      regiao: regiaoObj,
      estado: estadoObj,
      cidade: cidadeObj,
      tutor: tutorObj,
    };

    return proj;
  }

  async filtrarProjetos(queryParams: URLSearchParams): Promise<Project[]> {
    var endpoint = `${API_ENDPOINTS.PROJETOS_TODOS}?${queryParams.toString()}`;

    console.log("Endpoint", endpoint)

    const res = await axiosInstance.get(endpoint, {
      headers: { Authorization: `Bearer ${this.token}` },
    });

    var projetos = await Promise.all(
      res.data.map((projeto: any) => {
        return this.mapProject(projeto, this.token)
      })
    );

    projetos = projetos.filter(item => item !== undefined);
    // console.log("Filtrados", projetos)

    return projetos;
  }
}
