import { getCustomRepository } from "typeorm";

import { MessagesRepository } from "../repositories/MessageRepository";

interface IMessageRequest {
  admin_id: string;
  text: string;
  user_id: string;
}

class MessageService {
  async create({ admin_id, text, user_id }: IMessageRequest) {
    const messageRepository = getCustomRepository(MessagesRepository);

    const message = messageRepository.create({
      admin_id,
      text,
      user_id,
    });

    await messageRepository.save(message);

    return message;
  }

  async listByUser(user_id: string) {
    const messageRepository = getCustomRepository(MessagesRepository);

    const list = await messageRepository.find({
      where: { user_id },
      relations: ["user"],
    });

    return list;
  }
}

export { MessageService };
