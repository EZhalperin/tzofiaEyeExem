import express from "express";
import cors from "cors";
import "dotenv/config";

import router from "./routes/router.js";

const PORT = process.env.PORT;
const server = express();

// server.use(cors())
server.use(express.json());

server.use(router);

server.use((err, _req, res, _next) => {
  if (err) {
    const error = err.message || "System error";
    const status = err.status || 500;
    res.status(status).json({ error });
  }
});

server.listen(PORT, () => console.log(`listening on port ${PORT}`));
