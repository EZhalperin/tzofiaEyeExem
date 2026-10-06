import { alerts } from "../db/connectionToMongoDB.js";
import { getAll, getOne } from "../db/repositoryMongo.js";

export function vallidationId(req, res, next) {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "must enter ID" });
  if (isNaN(id)) return res.status(400).json({ error: "ID must be number" });
  req.id = Number(id);
  next();
}

export async function vallidationAlertExists(req, res, next) {
  const oneAlert = await getOne(alerts, req.id);
  if (!oneAlert)
    return res.status(404).json({ error: `id #${req.id} not found` });
  if (
    req.user.role === "arena_user" &&
    oneAlert.arena != req.user.assignedArena
  )
    return res.status(403).json({ error: `No permission` });
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
  if ((lon && isNaN(lon)) || (lat && isNaN(lat)))
    return res.status(400).json({ error: "lon and lat must be number" });
  req.alert = {
    displayName,
    description,
    priority,
    arena,
    status,
    lon: Number(lon),
    lat: Number(lat),
  };
  next();
}

export async function getNewId(req, _res, next) {
  const allAlerts = await getAll(alerts);
  const newId = alerts.length === 0 ? 1 : allAlerts.at(-1).id + 1;
  req.alert.id = newId;
  next();
}

export function vallidationUpdateAlert(req, res, next) {
  const { displayName, description, priority, arena, status, lon, lat } =
    req.body;
  if (
    req.user.role === "general_user" &&
    (displayName || description || priority || arena || lon || lat)
  )
    return res
      .status(400)
      .json({ error: "No permission, general user can change only status" });
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
  if ((lon && isNaN(lon)) || (lat && isNaN(lat)))
    return res.status(400).json({ error: "lon and lat must be number" });
  next();
}

export function getChanges(req, _res, next) {
  const { displayName, description, priority, arena, status, lon, lat } =
    req.body;
  req.alert = {};
  if (displayName) req.alert.displayName = displayName;
  if (description) req.alert.description = description;
  if (priority) req.alert.priority = priority;
  if (arena) req.alert.arena = arena;
  if (status) req.alert.status = status;
  if (lon) req.alert.lon = Number(lon);
  if (lat) req.alert.lat = Number(lat);
  next();
}
