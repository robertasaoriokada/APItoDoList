import { Tarefa } from "../../models/tarefa";
import { HttpRequest, HttpResponse } from "../protocolsGeneral";

export interface IDeleteTarefasController {
  handle(httpRequest: HttpRequest<unknown>): Promise<HttpResponse<Tarefa>>;
}
export interface IDeleteTarefasRepository {
  deleteTarefa(id: string): Promise<Tarefa>;
}
