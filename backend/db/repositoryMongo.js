import { alerts } from "./connectionToMongoDB.js";

export async function getAll() {
  const data = await alerts.find().toArray();
  return data;
}

export async function getOne(id) {
  const data = await alerts.findOne({ id });
  return data;
}

export async function addOne(oneAlert) {
  await alerts.insertOne(oneAlert);
}

export async function deleteOne(id) {
  await alerts.deleteOne({ id });
}

export async function updateOne(id, newAlert) {
  await alerts.updateOne({ id }, { $set: newAlert });
}
