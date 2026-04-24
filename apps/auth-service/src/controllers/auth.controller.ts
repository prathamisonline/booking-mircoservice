import { Request, Response } from "express";
import { prisma } from "@/prisma/client";

export const signup = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await prisma.user.create({
        data: { email, password },
    });

    res.json(user);
};  