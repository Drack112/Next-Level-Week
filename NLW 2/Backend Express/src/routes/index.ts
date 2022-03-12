import express from "express";
import { Router } from "express";

import ClassesController from "../Controllers/ClassesController";
import ConnectionsController from "../Controllers/ConnectionsController";

const classController = new ClassesController();
const connectionController = new ConnectionsController();

const routes = Router();

routes.get("/", (req: express.Request, res: express.Response) => {
  return res.status(200).json({ message: "Hello Dev 🖥️" });
});

routes.get("/classes", classController.index);
routes.post("/classes", classController.create_class);

routes.get("/connections", connectionController.index);
routes.post("/connections", connectionController.create_connection);

export default routes;
