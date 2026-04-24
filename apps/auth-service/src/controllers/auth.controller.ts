import { Request, Response } from "express";
import { prisma } from "@/prisma/client";
import { logger } from "@repo/logger";
import { generateToken } from "@/utils/jwt";
import bcrypt from "bcrypt";

export const signup = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { email, password: hashPassword },
        });

        logger.info({ email: user.email }, "User signed up successfully");
        res.json(user);
    } catch (error) {
        logger.error({ error, email }, "Failed to sign up user");
        res.status(500).json({ error: "Internal server error" });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });
        logger.info({ user }, "User found");

        if (!user) {
            logger.warn({ email }, "User not found");
            return res.status(404).json({ error: "User not found" });
        }

        if (!await bcrypt.compare(password, user.password)) {
            logger.warn({ email }, "Invalid password");
            return res.status(401).json({ error: "Invalid password" });
        }

        const token = generateToken(user);
        logger.info({ email: user.email }, "User logged in successfully");
        res.json({ user, token });
    } catch (error) {
        logger.error({ error, email }, "Failed to log in user");
        res.status(500).json({ error: "Internal server error" });
    }
}

