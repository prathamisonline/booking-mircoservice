import express from "express";
import { config } from "@repo/config";
import { logger } from "@repo/logger";
import bookingRoutes from "./routes/booking.routes";

const app = express();
app.use(express.json());

app.use("/booking", bookingRoutes);

app.listen(config.port, () => {
    logger.info(`Booking service running on port ${config.port}`);
});