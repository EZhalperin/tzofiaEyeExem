import bcrypt from "bcrypt";
import { users } from "../db/connectionToMongoDB.js";
import { addOne, getAll } from "../db/repositoryMongo.js";

export async function createNewUser(user) {
  const hashPassword = await bcrypt.hash(user.password, 12);
  user.password = hashPassword;
  await addOne(users, user);
}
