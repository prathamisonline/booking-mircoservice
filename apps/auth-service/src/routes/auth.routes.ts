import { Router } from "express";
import { signup, login } from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", authMiddleware, (req, res) => {
    // @ts-ignore
    res.json(req.user);
});

export default router;