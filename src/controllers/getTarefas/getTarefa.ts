import { IGetTarefasController, IGetTarefasRepository } from "./protocols";

export class GetTarefasController implements IGetTarefasController {
  constructor(private readonly getTarefasRepository: IGetTarefasRepository) {}
  async handle() {
    try {
      const tarefas = await this.getTarefasRepository.getTarefas();
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
