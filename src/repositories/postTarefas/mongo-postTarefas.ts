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
      .collection<Tarefa>("tarefa")
      .findOne({ _id: insertedId });

    if (!tarefa) {
      throw "Tarefa não criada";
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, ...rest } = tarefa;

    return tarefa;
  }
}
