import { users } from "../db/connectionToMongoDB.js";
import { getAll, getOne } from "../db/repositoryMongo.js";
import { checkPassword, checkToken } from "../helper/authFunctions.js";

export function vallidationFullUser(req, res, next) {
  const { userName, password, email, role, assignedArena } = req.body;
  if (!userName || !password || !email || !role || !assignedArena)
    return res.status(400).json({ error: "all params are required" });
  if (typeof userName != "string" || typeof email != "string")
    return res.status(400).json({ error: "userName and email must be text" });
  if (!email.includes("@"))
    return res.status(400).json({ error: "email must be with @" });
  if (!["arena_user", "general_user", "admin"].includes(role))
    return res
      .status(400)
      .json({ error: "role must be one of: arena_user, general_user, admin" });
  if (!["North", "South", "Center", "All"].includes(assignedArena))
    return res
      .status(400)
      .json({ error: "arena must be one of: North, South, Center, All" });
  req.user = { userName, password, email, role, assignedArena };
  next();
}

export async function getNewId(req, _res, next) {
  const allUsers = await getAll(users);
  req.user.id = allUsers.length === 0 ? 1 : allUsers.at(-1).id + 1;
  next();
}

export async function vallidationUserExists(req, res, next) {
  const oneUser = await getOne(users, Number(req.body.id));
  if (!oneUser)
    return res.status(404).json({ error: `user id #${req.id} not found` });
  req.user = oneUser;
  next();
}

export async function vallidationPassword(req, res, next) {
  const isMetch = await checkPassword(req.body.password, req.user.password);
  if (!isMetch) return res.status(401).json({ error: `password wrong` });
  next();
}

export function vallidationToken(req, res, next) {
  const token = req.cookies.token;
  const decode = checkToken(token);
  if (!decode) return res.status(401).json({ error: `token wrong` });
  req.id = Number(decode.id);
  next();
}
