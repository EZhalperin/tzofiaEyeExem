import express from "express";
import cors from "cors";
import "dotenv/config";

const PORT = process.env.PORT;
const server = express();

// server.use(cors())
server.use(express.json());

server.use((err, _req, res, _next) => {
  if (err) {
    const message = err.message || "System error";
    const status = err.status || 500;
    res.status(status).json({ message });
  }
});

server.listen(PORT, () => console.log(`listening on port ${PORT}`));
