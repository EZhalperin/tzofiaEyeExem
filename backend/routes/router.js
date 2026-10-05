import { Router } from "express";

const router = Router();

router.get("/api/alerts", async (req, res, next) => {
  try {
    // const result = await fn();
    res.status(200).json({ message: "result" });
  } catch (error) {
    next(error);
  }
});
router.get("/api/alerts/:id", async (req, res, next) => {
  try {
    const result = await fn();
    res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
});
router.post("/api/alerts", async (req, res, next) => {
  try {
    const result = await fn();
    res.status(201).json({ message: result, data: result });
  } catch (error) {
    next(error);
  }
});
router.delete("/api/alerts/:id", async (req, res, next) => {
  try {
    const result = await fn();
    res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
});
router.put("/api/alerts/:id", async (req, res, next) => {
  try {
    const result = await fn();
    res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
});

export default router;
