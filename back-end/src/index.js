import express from 'express';
import 'dotenv/config.js';
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"

import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
    connectDB();
});