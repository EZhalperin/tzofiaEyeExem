export async function getAll(collection, filter = {}) {
  const data = await collection.find(filter).toArray();
  return data;
}

export async function getOne(collection, UniqueIdentifier) {
  const data = await collection.findOne(UniqueIdentifier);
  return data;
}

export async function addOne(collection, oneLine) {
  await collection.insertOne(oneLine);
}

export async function deleteOne(collection, UniqueIdentifier) {
  await collection.deleteOne(UniqueIdentifier);
}

export async function updateOne(collection, UniqueIdentifier, newLineParams) {
  await collection.updateOne(UniqueIdentifier, { $set: newLineParams });
}
