import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_CONNECTION_STRING || 'mongodb+srv://basit-blog-site:123123123@cluster0.lpnbdnu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(uri);

export async function POST(request: Request) {
  try {
    await client.connect();
    const db = client.db('blog-form');
    const collection = db.collection('users');

    const data = await request.json();
    const { Username, Password } = data;

    // Check if the user exists with the provided username and password
    const user = await collection.findOne({ username: Username, password: Password });

    if (user) {
      // User authenticated successfully
      return new Response(JSON.stringify({ message: 'Authentication successful!' }), { status: 200 });
    } else {
      // Invalid credentials
      return new Response(JSON.stringify({ error: 'Invalid username or password' }), { status: 401 });
    }
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  } finally {
    await client.close();
  }
}
