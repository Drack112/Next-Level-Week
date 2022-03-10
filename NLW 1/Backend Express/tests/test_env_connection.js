"use strict";
exports.__esModule = true;
require("dotenv/config");
var env = {
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
};
console.log(env);
