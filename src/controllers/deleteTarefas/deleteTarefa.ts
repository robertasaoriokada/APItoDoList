import { Tarefa } from "../../models/tarefa";
import { HttpRequest, HttpResponse } from "../protocolsGeneral";
import {
  IDeleteTarefasController,
  IDeleteTarefasRepository,
} from "./protocols";

export class DeleteTarefasController implements IDeleteTarefasController {
  constructor(
    private readonly deleteTarefasRepository: IDeleteTarefasRepository
  ) {}

  async handle(httpRequest: HttpRequest<unknown>): Promise<HttpResponse<Tarefa>> {
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
