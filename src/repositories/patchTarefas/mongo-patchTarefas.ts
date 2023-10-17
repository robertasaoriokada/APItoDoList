import {
  IPatchTarefasRepository,
  PatchTarefasParams,
} from "../../controllers/patchTarefas/protocols";
import { MongoCliente } from "../../database/mongo";
import { Tarefa } from "../../models/tarefa";
import { ObjectId } from "mongodb";

export class MongoPatchTarefasRepository implements IPatchTarefasRepository {
  async patchTarefas(id: string, params: PatchTarefasParams): Promise<Tarefa> {
    await MongoCliente.db.collection("tarefas").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...params,
        },
      }
    );
    const tarefa = await MongoCliente.db
      .collection<Omit<Tarefa, "id">>("tarefas")
      .findOne({ _id: new ObjectId(id) });

    if (!tarefa) {
      throw new Error("Tarefa não foi atualizazda");
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, ...rest } = tarefa;
    return tarefa;
  }
}
