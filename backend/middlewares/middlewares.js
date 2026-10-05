import { getAll, getOne } from "../db/repositoryMongo.js";

export function vallidationId(req, res, next) {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "must enter ID" });
  if (typeof Number(id) != "number")
    return res.status(400).json({ error: "ID must be number" });
  next();
}

export function vallidationFullAlert(req, res, next) {
  const { displayName, description, priority, arena, status, lon, lat } =
    req.body;
  if (
    !displayName ||
    !description ||
    !priority ||
    !arena ||
    !status ||
    !lon ||
    !lat
  )
    return res.status(400).json({ error: "all params are required" });
  if (typeof displayName != "string" || typeof description != "string")
    return res
      .status(400)
      .json({ error: "displayName and description must be text" });
  if (!["Low", "Medium", "High", "Critical"].includes(priority))
    return res
      .status(400)
      .json({ error: "priority must be one of: Low, Medium, High, Critical" });
  if (!["North", "South", "Center"].includes(arena))
    return res
      .status(400)
      .json({ error: "arena must be one of: North, South, Center" });
  if (!["Active", "Handled"].includes(status))
    return res
      .status(400)
      .json({ error: "status must be one of: Active, Handled" });
  if (typeof lon != "number" || typeof lat != "number")
    return res.status(400).json({ error: "lon and lat must be number" });
  req.alert = { displayName, description, priority, arena, status, lon, lat };
  next();
}

export function vallidationUpdateAlert(req, res, next) {
  const { displayName, description, priority, arena, status, lon, lat } =
    req.body;
  if (
    (displayName && typeof displayName != "string") ||
    (description && typeof description != "string")
  )
    return res
      .status(400)
      .json({ error: "displayName and description must be text" });
  if (priority && !["Low", "Medium", "High", "Critical"].includes(priority))
    return res
      .status(400)
      .json({ error: "priority must be one of: Low, Medium, High, Critical" });
  if (arena && !["North", "South", "Center"].includes(arena))
    return res
      .status(400)
      .json({ error: "arena must be one of: North, South, Center" });
  if (status && !["Active", "Handled"].includes(status))
    return res
      .status(400)
      .json({ error: "status must be one of: Active, Handled" });
  if ((lon && typeof lon != "number") || (lat && typeof lat != "number"))
    return res.status(400).json({ error: "lon and lat must be number" });
  next();
}

export async function getNewId(req, res, next) {
  const alerts = await getAll();
  const newId = alerts.length === 0 ? 1 : alerts.at(-1).id + 1;
  req.alert.id = newId;
  next();
}

export async function vallidationAlertExists(req, res, next) {
  const oneAlert = await getOne(Number(req.params.id));
  if (!oneAlert)
    return res.status(404).json({ error: `id #${req.params.id} not found` });
  next();
}
