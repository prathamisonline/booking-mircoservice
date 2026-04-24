import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "@repo/config";
import { logger } from "@repo/logger";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const decodedToken = jwt.verify(token, config.jwtSecret);
        // @ts-ignore
        req.user = decodedToken;
        next();
    } catch (error) {
        logger.error({ error }, "Failed to authenticate token");
        res.status(401).json({ error: "Invalid token" });
    }
};