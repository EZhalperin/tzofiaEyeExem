export async function getAll(collection, filter = {}) {
  const data = await collection.find(filter).toArray();
  return data;
}

export async function getOne(collection, id) {
  const data = await collection.findOne({ id });
  return data;
}

export async function addOne(collection, oneLine) {
  await collection.insertOne(oneLine);
}

export async function deleteOne(collection, id) {
  await collection.deleteOne({ id });
}

export async function updateOne(collection, id, newLineParams) {
  await collection.updateOne({ id }, { $set: newLineParams });
}
