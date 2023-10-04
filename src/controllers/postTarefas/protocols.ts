import { Tarefa } from "../../models/tarefa";

export interface PostTarefasParams {
  titulo: string;
  descricao: string;
}
export interface IPostTarefaRepository {
  postTarefa(params: PostTarefasParams): Promise<Tarefa>;
}
