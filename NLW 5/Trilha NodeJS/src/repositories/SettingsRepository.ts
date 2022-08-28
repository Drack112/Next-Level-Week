import { Setting } from "../entities/Settings";

import { Repository, EntityRepository } from "typeorm";

@EntityRepository(Setting)
class SettingsRepository extends Repository<Setting> {}

export { SettingsRepository };
