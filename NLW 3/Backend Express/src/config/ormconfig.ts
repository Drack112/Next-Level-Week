import "dotenv/config";

export = {
  host: process.env.POSTGRES_HOST,
  type: "postgres",
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: ["../src/models/*.ts"],
  migrations: ["../src/database/migrations/*.ts"],
  cli: {
    migrationsDir: "../src/database/migrations",
  },
  synchronize: false,
};
