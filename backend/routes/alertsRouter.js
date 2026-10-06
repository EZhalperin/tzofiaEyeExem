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
import { getFilterByRole } from "../helper/authFunctions.js";
import {
  premissionChanges,
  vallidationToken,
} from "../middlewares/authMiddlewares.js";

const router = Router();

router.get("/api/alerts", vallidationToken, async (req, res, next) => {
  try {
    const result = await getAll(alerts, getFilterByRole(req.user));
    res.status(200).json({ message: "all alerts", data: result });
  } catch (error) {
    next(error);
  }
});

router.get(
  "/api/alerts/:id",
  vallidationToken,
  vallidationId,
  vallidationAlertExists,
  async (req, res, next) => {
    try {
      const result = await getOne(alerts, { id: req.id });
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
  vallidationToken,
  premissionChanges,
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
  vallidationToken,
  premissionChanges,
  vallidationId,
  vallidationAlertExists,
  async (req, res, next) => {
    try {
      await deleteOne(alerts, { id: req.id });
      res.status(200).json({ message: `alert #${req.params.id} deleted` });
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  "/api/alerts/:id",
  vallidationToken,
  vallidationId,
  vallidationUpdateAlert,
  vallidationAlertExists,
  getChanges,
  async (req, res, next) => {
    try {
      await updateOne(alerts, { id: req.id }, req.alert);
      res.status(200).json({ message: `alert #${req.params.id} updated` });
    } catch (error) {
      next(error);
    }
  },
);

export default router;
