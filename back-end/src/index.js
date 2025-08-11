import express from 'express';
import 'dotenv/config.js';
import authRoutes from "./routes/auth.route.js"
import { connectDB } from './lib/db.js';

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
    connectDB();
});