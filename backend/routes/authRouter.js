import { Router } from "express";
import { createNewUser, getToken } from "../helper/authFunctions.js";
import {
  getNewId,
  premissionAdmin,
  vallidationFullUser,
  vallidationPassword,
  vallidationToken,
  vallidationUserExists,
  vallidationUserExistsForDelete,
} from "../middlewares/authMiddlewares.js";
import { users } from "../db/connectionToMongoDB.js";
import { deleteOne, getOne } from "../db/repositoryMongo.js";

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
    const user = await getOne(users, req.user.id);
    res.status(200).json({ message: "user", user });
  } catch (error) {
    next(error);
  }
});

router.post(
  "/api/auth/register",
  vallidationToken,
  premissionAdmin,
  vallidationFullUser,
  getNewId,
  async (req, res, next) => {
    try {
      await createNewUser(req.newUser);
      res.status(201).json({ message: "new user created" });
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  "/api/auth/users/:id",
  vallidationToken,
  premissionAdmin,
  vallidationUserExistsForDelete,
  async (req, res, next) => {
    try {
      await deleteOne(users, req.id);
      res.status(200).json({ message: "user deleted" });
    } catch (error) {
      next(error);
    }
  },
);

export default router;
