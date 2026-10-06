import { Router } from "express";
import { createNewUser, getToken } from "../helper/authFunctions.js";
import {
  getNewId,
  vallidationFullUser,
  vallidationPassword,
  vallidationUserExists,
} from "../middlewares/authMiddlewares.js";

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
