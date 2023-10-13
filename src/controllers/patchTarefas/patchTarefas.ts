import { IPatchTarefasController, IPatchTarefasRepository } from "./protocols";

export class PatchTarefasController implements IPatchTarefasController {
  constructor(
    private readonly patchTarefasRepository: IPatchTarefasRepository
  ) {}
  async handle() {
    try {
      const tarefas = await this.patchTarefasRepository.patchTarefas();
      return {
        statusCode: 200,
        body: tarefas,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Something went wrong",
      };
    }
  }
}
