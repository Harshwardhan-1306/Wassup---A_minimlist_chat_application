import express from 'express';
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import cors from 'cors';
import { server, app } from './lib/socket.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json({ limit: '2mb' }));

app.use(cookieParser());
app.use(cors({
    origin: 'https://ubiquitous-pancake-pj9r56wqj4gxh6pqg-5173.app.github.dev',
    credentials: true
}));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../front-end/dist")));

  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.resolve(__dirname, "../../front-end/dist/index.html"));
  });
}

server.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
    connectDB();
});