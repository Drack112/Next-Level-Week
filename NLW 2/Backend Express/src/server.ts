import Express, { Request, Response } from "express";
import cors from "cors";
import routes from "./routes";

const app = Express();

app.use(Express.json());
app.use(cors());

app.use(routes);

app.listen(8000, () => {
  console.log(
    `š Express APP has been started!\nš„³ URL: http://localhost:8000`,
  );
});
