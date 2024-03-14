// api/auth/signin/route.ts
import { MongoClient } from 'mongodb';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const uri = process.env.MONGODB_CONNECTION_STRING || 'mongodb+srv://basit-blog-site:123123123@cluster0.lpnbdnu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(uri);

export async function POST(request: Request) {
    try {
        await client.connect();
        const db = client.db('blog-form');
        const collection = db.collection('users');

        const data = await request.json();
        const { Username, Password } = data;

        // Find user by username
        const user = await collection.findOne({ Username });

        if (user) {
            // Compare passwords
            const passwordMatch = await bcrypt.compare(Password, user.password);

            if (passwordMatch) {
                // Generate JWT token
                const token = jwt.sign({ userId: user._id }, 'e2f0baa67d4d3dd7733ad0b3ca2d07b0713d3f0325a2c2f8cd9d28b472442b649be9740a94e1b08a439c0a222650636a1b07801ad7264db7b8fd5a1ad7493283', { expiresIn: '1h' });

                return new Response(JSON.stringify({ message: 'Authentication successful', token }), { status: 200 });
            } else {
                return new Response(JSON.stringify({ error: 'Invalid username or password' }), { status: 401 });
            }
        } else {
            return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
        }
    } catch (error) {
        console.error('Error:', error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    } finally {
        await client.close();
    }
}
