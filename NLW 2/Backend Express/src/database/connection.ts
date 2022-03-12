import knex from "knex";
import path from "path";
import "dotenv/config";

const connection = knex({
  client: "pg",
  version: "^8.7.3",
  connection: {
    host: process.env.POSTGRES_HOST,
    port: 5432,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },
  useNullAsDefault: true,
  migrations: {
    directory: path.resolve(__dirname, "src", "database", "migrations"),
  },
  seeds: {
    directory: path.resolve(__dirname, "src", "database", "seeds"),
  },
});

// console.log(connection.client["connectionSettings"]);

export default connection;
