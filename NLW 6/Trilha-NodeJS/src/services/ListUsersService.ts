import { getCustomRepository } from "typeorm";
import { classToPlain } from "class-transformer";

import { UsersRepositories } from "../repositories/UsersRepositories";

class ListUserService {
  async execute() {
    const usersRepositories = getCustomRepository(UsersRepositories);

    const users = await usersRepositories.find();

    return classToPlain(users);
  }
}

export { ListUserService };
