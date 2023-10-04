import { IGetTarefasRepository } from "../../controllers/getTarefas/protocols";
import { MongoCliente } from "../../database/mongo";
import { Tarefa } from "../../models/tarefa";

export class MongoGetTarefasRepository implements IGetTarefasRepository {
  async getTarefas(): Promise<Tarefa[]> {
    const tarefas = await MongoCliente.db
      .collection<Omit<Tarefa, "id">>("tarefas")
      .find({})
      .toArray();
    return tarefas.map(({ _id, ...rest }) => ({
      ...rest,
      id: _id.toHexString(),
    }));
  }
}
