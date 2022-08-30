import express from "express";
import {
  getBranch,
  getUsers,
  login,
  register,
  logout,
  allPost,
  getPost,
  allComments,
  getComments,
} from "../controllers/Users.js";
import { VerifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();

router.get("/users", VerifyToken, getUsers);

router.get("/branch", VerifyToken, getBranch);

router.get("/post", VerifyToken, getPost);

router.get("/comments/:id", VerifyToken, getComments);

router.post("/login", login);

router.post("/register", register);

router.delete("/logout", logout);

router.post("/post", allPost);

router.post("/comments", allComments);

router.get("/token", VerifyToken, (req, res) => {
  res.sendStatus(200);
});

export default router;
