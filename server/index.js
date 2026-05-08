import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
app.use(express.json());

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("🟢 conectado:", socket.id);

  socket.on("disconnect", () => {
    console.log("🔴 desconectado:", socket.id);
  });
});

app.post("/webhook", (req, res) => {
  const data = req.body;

  console.log("📩 webhook recebido:", data);

  io.emit("evento", data);

  res.sendStatus(200);
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/page.tsx");
});

httpServer.listen(3001, () => {
  console.log("🚀 servidor rodando na 3001");
});
