export async function getAll(collection) {
  const data = await collection.find().toArray();
  return data;
}

export async function getOne(collection, id) {
  const data = await collection.findOne({ id });
  return data;
}

export async function addOne(collection, oneAlert) {
  await collection.insertOne(oneAlert);
}

export async function deleteOne(collection, id) {
  await collection.deleteOne({ id });
}

export async function updateOne(collection, id, newAlertParams) {
  await collection.updateOne({ id }, { $set: newAlertParams });
}
