import jwt from "jsonwebtoken";
import { User } from "@prisma/client";
import { config } from "@repo/config";

export const generateToken = (user: User) => {
    return jwt.sign(
        { userId: user.id, email: user.email },
        config.jwtSecret,
        { expiresIn: config.jwtExpiresIn as any }
    );
};

export const verifyToken = (token: string) => {
    return jwt.verify(token, config.jwtSecret);
};
