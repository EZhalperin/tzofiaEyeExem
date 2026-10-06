import { Router } from "express";
import { createNewUser } from "../helper/authFunctions.js";
import {
  getNewId,
  vallidationFullUser,
} from "../middlewares/authMiddlewares.js";

const router = Router();

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
