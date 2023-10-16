import { Tarefa } from "../../models/tarefa";
import { HttpRequest, HttpResponse } from "../protocolsGeneral";

export interface PatchTarefasParams {
  titulo?: string;
  descricao?: string;
  status?: boolean;
}
export interface IPatchTarefasController {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<Tarefa>>;
}

export interface IPatchTarefasRepository {
  patchTarefas(): Promise<Tarefa>;
}
