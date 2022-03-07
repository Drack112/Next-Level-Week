import express from "express";
import Router from "./Router";
import path from "path";
import cors from "cors";
import { errors } from "celebrate";

const app = express();

app.use(cors());
app.use(express.json());
app.use(Router);

app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));

app.use(errors());

app.listen(8000, () => {
  console.log(
    `🚀 Express APP has been started!\n🥳 URL: http://localhost:8000`,
  );
});
