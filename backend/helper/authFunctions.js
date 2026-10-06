import bcrypt from "bcrypt";
import { users } from "../db/connectionToMongoDB.js";
import { addOne, getAll } from "../db/repositoryMongo.js";

export async function createNewUser(user) {
  const hashPassword = await bcrypt.hash(user.password, 12);
  user.password = hashPassword;
  const allUsers = await getAll(users);
  user.id = allUsers.length === 0 ? 1 : allUsers.at(-1).id + 1;
  await addOne(users, user);
}
