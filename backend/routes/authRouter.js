import { Router } from "express";
import { createNewUser, getToken } from "../helper/authFunctions.js";
import {
  getNewId,
  vallidationFullUser,
  vallidationPassword,
  vallidationToken,
  vallidationUserExists,
} from "../middlewares/authMiddlewares.js";
import { users } from "../db/connectionToMongoDB.js";
import { getOne } from "../db/repositoryMongo.js";

const router = Router();

router.post(
  "/api/auth/login",
  vallidationUserExists,
  vallidationPassword,
  async (req, res, next) => {
    try {
      const token = getToken(req.user);
      res.cookie("token", token, { httpOnly: true });
      res.status(201).json({ message: "user logined", token });
    } catch (error) {
      next(error);
    }
  },
);

router.get("/api/auth/me", vallidationToken, async (req, res, next) => {
  try {
    const user = await getOne(users, req.id);
    res.status(200).json({ message: "user", user });
  } catch (error) {
    next(error);
  }
});

router.post(
  "/api/auth/register",
  vallidationFullUser,
  getNewId,
  async (req, res, next) => {
    try {
      await createNewUser(req.user);
      res.status(201).json({ message: "new user created" });
    } catch (error) {
      next(error);
    }
  },
);

export default router;
