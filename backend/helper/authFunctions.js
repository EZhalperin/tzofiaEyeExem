import bcrypt from "bcrypt";
import { users } from "../db/connectionToMongoDB.js";
import { addOne } from "../db/repositoryMongo.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export async function createNewUser(user) {
  const hashPassword = await bcrypt.hash(user.password, 12);
  user.password = hashPassword;
  await addOne(users, user);
}

export async function checkPassword(password, hashPassword) {
  return bcrypt.compare(password, hashPassword);
}

export function getToken({ id, role }) {
  const token = jwt.sign({ id, role }, JWT_SECRET, { expiresIn: "10m" });
  return token;
}

export function checkToken(token) {
  const decode = jwt.verify(token, JWT_SECRET);
  return decode;
}
