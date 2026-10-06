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
} from "../middlewares/alertsMiddlewares.js";
import { alerts } from "../db/connectionToMongoDB.js";

const router = Router();

router.get("/api/alerts", async (req, res, next) => {
  try {
    const result = await getAll(alerts);
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
      const result = await getOne(alerts, req.id);
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
      await addOne(alerts, req.alert);
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
      await deleteOne(alerts, req.id);
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
      await updateOne(alerts, req.id, req.alert);
      res.status(200).json({ message: `alert #${req.params.id} updated` });
    } catch (error) {
      next(error);
    }
  },
);

export default router;
