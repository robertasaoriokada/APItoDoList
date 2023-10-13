import { Tarefa } from "../../models/tarefa";
import { HttpRequest, HttpResponse } from "../protocolsGeneral";

export interface IPostTarefaController {
  handle(
    httpRequest: HttpRequest<PostTarefasParams>
  ): Promise<HttpResponse<Tarefa>>;
}

export interface PostTarefasParams {
  titulo: string;
  descricao: string;
  status: false;
}
export interface IPostTarefaRepository {
  postTarefa(params: PostTarefasParams): Promise<Tarefa>;
}
