import { prisma } from "../prisma/client";
import { Request, Response } from "express";
import { logger } from "@repo/logger";

export const createBooking = async (req: Request, res: Response) => {
    const { eventName } = req.body;
    const userId = (req as any).user?.userId;

    if (!userId) {
        logger.warn("Booking attempt without userId");
        return res.status(401).send("Unauthorized");
    }

    try {
        const booking = await prisma.booking.create({
            data: {
                eventName,
                userId,
            },
        });

        logger.info({ bookingId: booking.id, userId }, "Booking created successfully");
        res.json(booking);
    } catch (error) {
        logger.error({ error, userId, eventName }, "Failed to create booking");
        res.status(500).json({ error: "Failed to create booking" });
    }
};