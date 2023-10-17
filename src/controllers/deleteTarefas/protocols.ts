import { Tarefa } from "../../models/tarefa";

export interface IDeleteTarefasRepository {
  deleteTarefa(id: string): Promise<Tarefa>;
}
