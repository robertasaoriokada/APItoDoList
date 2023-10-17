import express from "express";
import { config } from "dotenv";
import { MongoGetTarefasRepository } from "./repositories/getTarefas/mongo-getTarefas";
import { GetTarefasController } from "./controllers/getTarefas/getTarefa";
import { MongoCliente } from "./database/mongo";
import { MongoPostTarefaRepository } from "./repositories/postTarefas/mongo-postTarefas";
import PostTarefaController from "./controllers/postTarefas/postTarefa";
import { MongoPatchTarefasRepository } from "./repositories/patchTarefas/mongo-patchTarefas";
import { PatchTarefasController } from "./controllers/patchTarefas/patchTarefas";
import { MongoDeleteTarefaRepository } from "./repositories/deleteTarefas/mongo-deleteTarefas";
import { DeleteTarefasController } from "./controllers/deleteTarefas/deleteTarefa";

const main = async () => {
  config();
  const app = express();
  const port = process.env.PORT || 3333;
  await MongoCliente.connect();
  app.use(express.json());

  app.get("/tarefas", async (req, res) => {
    const mongoGetTarefasRepository = new MongoGetTarefasRepository();
    const getTarefasController = new GetTarefasController(
      mongoGetTarefasRepository
    );
    const { body, statusCode } = await getTarefasController.handle();

    res.send(body).status(statusCode);
  });

  app.post("/tarefas", async (req, res) => {
    const mongoPostTarefaRepository = new MongoPostTarefaRepository();
    const postTarefaController = new PostTarefaController(
      mongoPostTarefaRepository
    );
    const { body, statusCode } = await postTarefaController.handle({
      body: req.body,
    });
    res.status(statusCode).send(body);
  });

  app.delete("tarefas/:id", async (req, res) => {
    const mongoDeleteTarefaRepository = new MongoDeleteTarefaRepository();
    const deleteTarefasController = new DeleteTarefasController(
      mongoDeleteTarefaRepository
    );
    const { body, statusCode } = await deleteTarefasController.handle({
      body: req.body,
      params: req.params,
    });
    res.status(statusCode).send(body);
  });

  app.patch("/tarefas/:id", async (req, res) => {
    const mongoPatchTarefasRepository = new MongoPatchTarefasRepository();
    const patchTarefasController = new PatchTarefasController(
      mongoPatchTarefasRepository
    );
    const { body, statusCode } = await patchTarefasController.handle({
      body: req.body,
      params: req.params,
    });
    res.status(statusCode).send(body);
  });

  app.listen(port, () => {
    console.log(`Rodando na porta ${port}`);
  });
};

main();
