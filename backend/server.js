import express from "express";
import cors from "cors";
import "dotenv/config";

import alertsRouter from "./routes/alertsRouter.js";
import authRouter from "./routes/authRouter.js";

const PORT = process.env.PORT;
const server = express();

server.use(cors({ origin: "http://localhost:5173" }));
server.use(express.json());

server.use(alertsRouter);
server.use(authRouter);

server.use((err, _req, res, _next) => {
  if (err) {
    const error = err.message || "Internal Server Error";
    const status = err.status || 500;
    res.status(status).json({ error });
  }
});

server.listen(PORT, () => console.log(`listening on port ${PORT}`));
