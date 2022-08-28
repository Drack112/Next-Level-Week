import { Router } from "express";

import { UsersController } from "../controllers/UserController";
import SettingsController from "../controllers/SettingsController";
import MessageController from "../controllers/MessageController";

const routes = Router();

const settingsController = new SettingsController();
const usersController = new UsersController();
const messageController = new MessageController();

routes.post("/settings", settingsController.create);
routes.post("/users", usersController.create);

routes.post("messages", messageController.create);
routes.get("/messages", messageController.showByUser);

export default routes;
