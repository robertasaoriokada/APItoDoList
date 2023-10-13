import { Tarefa } from "../../models/tarefa";
import { HttpRequest, HttpResponse } from "../protocolsGeneral";
import {
  IPostTarefaController,
  IPostTarefaRepository,
  PostTarefasParams,
} from "./protocols";

export default class PostTarefaController implements IPostTarefaController {
  constructor(private readonly postTarefaRepository: IPostTarefaRepository) {}
  async handle(
    httpRequest: HttpRequest<PostTarefasParams>
  ): Promise<HttpResponse<Tarefa>> {
    try {
      const requiredFields = ["titulo", "descricao"];

      for (const fields of requiredFields) {
        if (!httpRequest?.body?.[fields as keyof PostTarefasParams]) {
          return {
            statusCode: 400,
            body: "Please, especifique o corpo da mensagem",
          };
        }
      }

      const tarefa = await this.postTarefaRepository.postTarefa(
        httpRequest.body!
      );
      return {
        statusCode: 201,
        body: tarefa,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Algo deu errado",
      };
    }
  }
}
