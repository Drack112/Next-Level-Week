import { Router } from "express";

import { UsersController } from "../controllers/UserController";
import SettingsController from "../controllers/SettingsController";

const routes = Router();

const settingsController = new SettingsController();
const usersController = new UsersController();

routes.post("/settings", settingsController.create);

routes.post("/users", usersController.create);

export default routes;
