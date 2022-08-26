import express from "express";
import { getUsers, login, register, logout } from "../controllers/Users.js";
import { VerifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();

router.get("/users", VerifyToken, getUsers);

router.post("/login", login);

router.post("/register", register);

router.delete("/logout", logout);

router.get("/token", VerifyToken, (req, res) => {
  res.sendStatus(200);
});

export default router;
