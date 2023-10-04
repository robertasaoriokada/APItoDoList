import { IGetTarefasRepository } from "../../controllers/getTarefas/protocols";
import { MongoCliente } from "../../database/mongo";
import { Tarefa } from "../../models/tarefa";

export class MongoGetTarefasRepository implements IGetTarefasRepository {
  async getTarefas(): Promise<Tarefa[]> {
    const tarefas = await MongoCliente.db
      .collection<Tarefa>("tarefas")
      .find({})
      .toArray();
    return [
      {
        titulo: "Tirar o lixo",
        descricao: "Misericórdia",
        status: false,
      },
    ];
  }
}
