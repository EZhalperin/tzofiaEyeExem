import { Router } from "express";
import {
  addOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "../db/repositoryMongo.js";
import {
  vallidationFullAlert,
  vallidationId,
  vallidationUpdateAlert,
  getNewId,
  vallidationAlertExists,
  getChanges,
} from "../middlewares/middlewares.js";

const router = Router();

router.get("/api/alerts", async (req, res, next) => {
  try {
    const result = await getAll();
    res.status(200).json({ message: "all alerts", data: result });
  } catch (error) {
    next(error);
  }
});
router.get(
  "/api/alerts/:id",
  vallidationId,
  vallidationAlertExists,
  async (req, res, next) => {
    try {
      const result = await getOne(Number(req.params.id));
      res
        .status(200)
        .json({ message: `alert #${req.params.id}`, data: result });
    } catch (error) {
      next(error);
    }
  },
);
router.post(
  "/api/alerts",
  vallidationFullAlert,
  getNewId,
  async (req, res, next) => {
    try {
      await addOne(req.alert);
      res.status(201).json({ message: "new alert added" });
    } catch (error) {
      next(error);
    }
  },
);
router.delete(
  "/api/alerts/:id",
  vallidationId,
  vallidationAlertExists,
  async (req, res, next) => {
    try {
      const result = await deleteOne(Number(req.params.id));
      res.status(200).json({ message: `alert #${req.params.id} deleted` });
    } catch (error) {
      next(error);
    }
  },
);
router.put(
  "/api/alerts/:id",
  vallidationId,
  vallidationUpdateAlert,
  vallidationAlertExists,
  getChanges,
  async (req, res, next) => {
    try {
      await updateOne(Number(req.params.id), req.alert);
      res.status(200).json({ message: `alert #${req.params.id} updated` });
    } catch (error) {
      next(error);
    }
  },
);

export default router;
