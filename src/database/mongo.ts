import { config } from "dotenv";
import { MongoClient as Mongo, Db } from "mongodb";
config();

export const MongoCliente = {
  client: undefined as unknown as Mongo,
  db: undefined as unknown as Db,
  async connect(): Promise<void> {
    const url = process.env.MONGODB_URL || "localhost:3333";
    const username = process.env.MONGODB_USERNAME;
    const password = process.env.MONGODB_PASSWORD;

    const client = new Mongo(url, { auth: { username, password } });
    const db = client.db("ToDoList");

    this.client = client;
    this.db = db;
    console.log("Connected!");
  },
};
