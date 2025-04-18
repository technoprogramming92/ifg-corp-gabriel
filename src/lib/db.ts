import { MongoClient } from "mongodb";

const uri = import.meta.env.MONGO_URI;

if (!uri) {
  throw new Error("Please define MONGODB_URI in your .env file");
}

// Singleton MongoDB client to avoid multiple connections
let cachedClient: MongoClient | null = null;

export async function getCollection(collectionName = "articles") {
  if (!cachedClient) {
    cachedClient = new MongoClient(uri);

    try {
      await cachedClient.connect();
      console.log("✅ MongoDB connected");
    } catch (error) {
      console.error("❌ Failed to connect to MongoDB:", error);
      throw error;
    }
  }

  const db = cachedClient.db("ifg");
  return db.collection(collectionName);
}
