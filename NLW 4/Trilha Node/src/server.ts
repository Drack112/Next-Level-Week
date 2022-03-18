import { app } from "./app";

import "dotenv/config";

const PORT = process.env.PORTA;

app.listen(PORT);
