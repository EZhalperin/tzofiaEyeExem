import { MongoClient } from "mongodb";

async function connectToMongo() {
  const uri = process.env.MONGO_URI;
  const client = new MongoClient(uri);
  client.connect();
  const database = client.db("TzofiaEye");
  const alerts = database.collection("alerts");
  return alerts;
}

export const alerts = await connectToMongo();
