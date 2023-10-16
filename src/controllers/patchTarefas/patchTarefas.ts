import { Tarefa } from "../../models/tarefa";
import { HttpRequest, HttpResponse } from "../protocolsGeneral";
import {
  IPatchTarefasController,
  IPatchTarefasRepository,
  PatchTarefasParams,
} from "./protocols";

export class PatchTarefasController implements IPatchTarefasController {
  constructor(
    private readonly patchTarefasRepository: IPatchTarefasRepository //declara e atribui de uma vez só o patchtarefasrepository
  ) {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<Tarefa>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;
      if (!id) {
        return {
          statusCode: 400,
          body: "Missing to do",
        };
      }
      const allowedFieldsToUpdate: (keyof PatchTarefasParams)[] = [
        "titulo",
        "descricao",
        "status",
      ];
      const someFieldsIsNotAllowedToUpdate = Object.keys(body).some(
        (key) =>
          !allowedFieldsToUpdate.includes(key as keyof PatchTarefasParams)
      );
      if (someFieldsIsNotAllowedToUpdate) {
        return {
          statusCode: 400,
          body: "Some received field is not allowed",
        };
      }

      const tarefa = await this.patchTarefasRepository.patchTarefas(id, body);
      return {
        statusCode: 200,
        body: tarefa,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Somethin gwent wrong",
      };
    }
  }
}
