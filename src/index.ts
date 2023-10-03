import express from "express";
import { config } from "dotenv";
import { MongoGetTarefasRepository } from "./repositories/getTarefas/mongo-getTarefas";
import { GetTarefasController } from "./controllers/getTarefas/getTarefa";
config();
const app = express();
const port = process.env.PORT || 3333;

app.get("/tarefas", async (req, res) => {
  const mongoGetTarefasRepository = new MongoGetTarefasRepository();
  const getTarefasController = new GetTarefasController(
    mongoGetTarefasRepository
  );
  const { body, statusCode } = await getTarefasController.handle();

  res.send(body).status(statusCode);
});

app.listen(port, () => {
  console.log("Oi");
});
