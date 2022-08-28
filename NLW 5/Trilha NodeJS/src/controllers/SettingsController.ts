import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";

import { SettingsRepository } from "../repositories/SettingsRepository";

class SettingsController {
  async create(request: Request, response: Response) {
    const { chat, username } = request.body;

    const settings_Repository = getCustomRepository(SettingsRepository);

    const settings = settings_Repository.create({
      chat,
      username,
    });

    await settings_Repository.save(settings);

    return response.json(settings);
  }
}

export default SettingsController;
