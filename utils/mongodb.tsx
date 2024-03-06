// utils/mongodb.js
import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://basit-blog-site:123123123@cluster0.lpnbdnu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(uri);

export async function connectToDatabase() {
  await client.connect();
  return client.db('blog-form');
}

export default connectToDatabase;
