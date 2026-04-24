import express from "express";
import { config } from "@repo/config";
import { logger } from "@repo/logger";
import authRoutes from "./routes/auth.routes";

const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
    res.send("Auth Service Running");
});

app.use("/auth", authRoutes);

app.listen(config.port, () => {
    logger.info(`Auth Service running on port ${config.port}`);
});