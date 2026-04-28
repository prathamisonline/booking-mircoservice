// routes/booking.routes.ts
import { Router } from "express";
import { createBooking } from "../controllers/booking.controller";
import { verifyToken } from "../middleware/authMiddleware";

const router = Router();

router.post("/", verifyToken, createBooking);

export default router;