import { Tarefa } from "../../models/tarefa";
import { HttpResponse } from "../protocolsGeneral";

export interface IGetTarefasController {
  handle(): Promise<HttpResponse<Tarefa[]>>;
}
export interface IGetTarefasRepository {
  getTarefas(): Promise<Tarefa[]>;
}
