import { Tarefa } from "../../models/tarefa";
import { HttpResponse } from "../protocolsGeneral";

export interface PatchTarefasParams {
  titulo?: string;
  decricao?: string;
  status?: boolean;
}
export interface IPatchTarefasController {
  handle(params: PatchTarefasParams): Promise<HttpResponse<Tarefa>>;
}

export interface IPatchTarefasRepository {
  patchTarefas(): Promise<Tarefa>;
}
