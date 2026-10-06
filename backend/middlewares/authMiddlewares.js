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
  req.newUser = { userName, password, email, role, assignedArena };
  next();
}

export async function getNewId(req, _res, next) {
  const allUsers = await getAll(users);
  req.newUser.id = allUsers.length === 0 ? 1 : allUsers.at(-1).id + 1;
  next();
}

export async function vallidationUserExists(req, res, next) {
  const oneUser = await getOne(users, { userName: req.body.userName });
  if (!oneUser)
    return res
      .status(404)
      .json({ error: `user name - ${req.body.userName} - not found` });
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
  req.user = decode;
  req.user.id = Number(decode.id);
  next();
}

export async function vallidationUserExistsForDelete(req, res, next) {
  const oneUser = await getOne(users, { id: Number(req.params.id) });
  if (!oneUser)
    return res
      .status(404)
      .json({ error: `user id #${req.params.id} not found` });
  req.id = oneUser.id;

  next();
}

export function premissionChanges(req, res, next) {
  if (req.user.role === "general_user")
    return res
      .status(403)
      .json({ error: `general user can't change or add alerts` });
  next();
}

export function premissionAdmin(req, res, next) {
  if (req.user.role != "admin")
    return res.status(403).json({ error: `no premission, only for Admins` });
  next();
}
