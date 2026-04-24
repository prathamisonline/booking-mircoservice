import { Request, Response } from "express";
import { prisma } from "@/prisma/client";
import { logger } from "@repo/logger";

export const signup = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.create({
            data: { email, password },
        });

        logger.info({ email: user.email }, "User signed up successfully");
        res.json(user);
    } catch (error) {
        logger.error({ error, email }, "Failed to sign up user");
        res.status(500).json({ error: "Internal server error" });
    }
};  