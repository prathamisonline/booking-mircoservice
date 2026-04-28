import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "@repo/config";
import { logger } from "@repo/logger";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];

    if (!token) return res.status(401).send("Unauthorized");

    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        // @ts-ignore
        req.user = decoded;
        next();
    } catch (error) {
        logger.warn({ error, token: token.substring(0, 10) + "..." }, "Invalid token provided");
        return res.status(401).send("Invalid token");
    }
};