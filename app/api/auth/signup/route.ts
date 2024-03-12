// api/auth/signup/route.ts
import jwt from 'jsonwebtoken';
import bcrypt, { hash } from 'bcrypt';
import connectToDatabase from "@/utils/mongodb";

export async function POST(request: Request) {
  const data = await request.json();

  try {
    const db = await connectToDatabase();
    const collection = db.collection('users');
    const hashedPassword = await bcrypt.hash(data.Password, 10);

    // Insert user data into the MongoDB collection
    const result = await collection.insertOne({
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.Username,
      password: hashedPassword,
    });
    // Generate JWT token
    const token = jwt.sign({
      userId: result.insertedId,
      username: data.Username
    }, 'e2f0baa67d4d3dd7733ad0b3ca2d07b0713d3f0325a2c2f8cd9d28b472442b649be9740a94e1b08a439c0a222650636a1b07801ad7264db7b8fd5a1ad7493283');
    
    return Response.json({ message: 'User registered successfully', token });
  } catch (error) {
    console.error('Error:', error);
    return Response.json({ error: 'Failed to register user' });
  }
}

