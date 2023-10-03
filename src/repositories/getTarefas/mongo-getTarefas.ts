import { IGetTarefasRepository } from "../../controllers/getTarefas/protocols";
import { Tarefa } from "../../models/tarefa";

export class MongoGetTarefasRepository implements IGetTarefasRepository {
  async getTarefas(): Promise<Tarefa[]> {
    return [
      {
        titulo: "Tirar o lixo",
        descricao: "Misericórdia",
        status: false,
      },
    ];
  }
}
