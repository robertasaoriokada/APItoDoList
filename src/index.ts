import express from "express";
import { config } from "dotenv";
import { MongoGetTarefasRepository } from "./repositories/getTarefas/mongo-getTarefas";
import { GetTarefasController } from "./controllers/getTarefas/getTarefa";
import { MongoCliente } from "./database/mongo";
import { MongoPostTarefaRepository } from "./repositories/postTarefas/mongo-postTarefas";
import PostTarefaController from "./controllers/postTarefas/postTarefa";

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
    res.send(body).status(statusCode);
  });

  app.listen(port, () => {
    console.log(`Rodando na porta ${port}`);
  });
};

main();
