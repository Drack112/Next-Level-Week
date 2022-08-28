import { getCustomRepository } from "typeorm";

import { SettingsRepository } from "../repositories/SettingsRepository";

interface ISettingsRequest {
  chat: boolean;
  username: string;
}

class SettingsService {
  async execute({ chat, username }: ISettingsRequest) {
    const settings_Repository = getCustomRepository(SettingsRepository);

    const userAlreadyExists = await settings_Repository.findOne({
      username,
    });

    if (userAlreadyExists) {
      throw new Error("User already exists!");
    }

    const settings = settings_Repository.create({
      chat,
      username,
    });

    await settings_Repository.save(settings);

    return settings;
  }
}

export { SettingsService };
