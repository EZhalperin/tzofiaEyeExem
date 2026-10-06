import { Router } from "express";
import { createNewUser } from "../helper/authFunctions.js";

const router = Router();

router.post("/api/auth/register", async (req, res, next) => {
  try {
    await createNewUser(req.user);
    res.status(201).json({ message: "new user created" });
  } catch (error) {
    next(error);
  }
});

export default router;
