import express from "express";
import cors from "cors";
import path from "path";
import "express-async-errors";

import routes from "./routes";
import errorHandler from "./errors/handler";

import "./database/connection";

import "dotenv/config";

const app = express();
const PORT = process.env.PORTA;

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errorHandler);

app.use("/images", express.static(path.join(__dirname, "..", "uploads")));

app.listen(PORT, () => {
  console.log("Server started!");
});
