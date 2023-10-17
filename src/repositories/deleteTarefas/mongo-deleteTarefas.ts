import { ObjectId } from "mongodb";
import { IDeleteTarefasRepository } from "../../controllers/deleteTarefas/protocols";
import { Tarefa } from "../../models/tarefa";
import { MongoCliente } from "../../database/mongo";

export class MongoDeleteTarefaRepository implements IDeleteTarefasRepository {
  async deleteTarefa(id: string): Promise<Tarefa> {
    const tarefa = await MongoCliente.db
      .collection<Omit<Tarefa, "id">>("tarefas")
      .findOne({ _id: new ObjectId(id) });

    if (!tarefa) {
      throw "Tarefa não encontrada";
    }

    const { deletedCount } = await MongoCliente.db
      .collection("tarefas")
      .deleteOne({ _id: new ObjectId() });

    if (!deletedCount) {
      throw "Tarefa não deletada";
    }

    const { ...rest } = tarefa;

    return { ...rest };
  }
}
