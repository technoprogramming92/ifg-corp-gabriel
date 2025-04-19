import { MongoClient, Db } from 'mongodb';

const uri = import.meta.env.MONGODB_URI;
const client = new MongoClient(uri);

let db: Db | null = null;

export async function getCollection(collectionName = 'articles') {
  if (!db) {
    await client.connect();
    db = client.db('ifg'); // replace 'ifg' with your actual database name
    console.log('✅ MongoDB connected');
  }

  return db.collection(collectionName);
}
