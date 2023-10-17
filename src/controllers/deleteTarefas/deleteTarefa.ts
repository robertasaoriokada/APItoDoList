import { Tarefa } from "../../models/tarefa";
import { MongoDeleteTarefaRepository } from "../../repositories/deleteTarefas/mongo-deleteTarefas";
import { HttpRequest, HttpResponse } from "../protocolsGeneral";
import { IDeleteTarefasRepository } from "./protocols";

export class DeleteTarefasController implements IDeleteTarefasRepository {
  constructor(
    private readonly deleteTarefasRepository: IDeleteTarefasRepository
  ) {}

  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<Tarefa>> {
    try {
      const id = httpRequest?.params?.id;
      if (!id) {
        return {
          statusCode: 400,
          body: "Missing task id",
        };
      }
      const tarefa = await this.deleteTarefasRepository.deleteTarefa(id);
      return {
        statusCode: 200,
        body: tarefa,
      };
    } catch {
      return {
        statusCode: 500,
        body: "Something went wrong",
      };
    }
  }
}
