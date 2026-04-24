import express from "express";
import authRoutes from "./routes/auth.routes";

const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
    res.send("Auth Service Running");
});

app.use("/auth", authRoutes);

app.listen(3001, () => {
    console.log("Auth Service running on port 3001");
});