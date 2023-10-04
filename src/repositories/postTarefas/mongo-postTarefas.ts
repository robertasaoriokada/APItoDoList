import {
  IPostTarefaRepository,
  PostTarefasParams,
} from "../../controllers/postTarefas/protocols";
import { MongoCliente } from "../../database/mongo";
import { Tarefa } from "../../models/tarefa";

export class MongoPostTarefaRepository implements IPostTarefaRepository {
  async postTarefa(params: PostTarefasParams): Promise<Tarefa> {
    const { insertedId } = await MongoCliente.db
      .collection("tarefas")
      .insertOne(params);

    const tarefa = await MongoCliente.db
      .collection<Omit<Tarefa, "id">>("tarefa")
      .findOne({ _id: insertedId });

    if (!tarefa) {
      throw new Error("Tarefa não criada");
    }
    const { _id, ...rest } = tarefa;

    return { id: _id.toHexString(), ...rest };
  }
}
