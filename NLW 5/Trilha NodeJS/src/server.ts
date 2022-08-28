import "reflect-metadata";
import "express-async-errors";

import express from "express";

import "./database";
import routes from "./routes";

const app = express();

app.use(express.json());

app.use(routes);

app.listen(3000, () => {
  console.log("Server up on port 3000 🚀");
});
