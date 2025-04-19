export const prerender = false;
import type { APIContext } from "astro";
import { MongoClient } from "mongodb";


export async function POST({ request }: APIContext) {
  const data = await request.json();

  const client = await MongoClient.connect(import.meta.env.MONGO_URI);
  const db = client.db("ifg");
  const collection = db.collection("articles");

  await collection.insertOne({
    title: data.title,
      content: data.content,
      imageUrl: data.imageUrl,
      date: data.date,
      author: data.author,
      articleNumber: data.articleNumber,// Ensure it's stored as string
  });

  client.close();

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
