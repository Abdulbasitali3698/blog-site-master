// api/auth/signup/route.ts

import connectToDatabase from "@/utils/mongodb";

export async function POST(request: Request) {
  const data = await request.json();

  try {
    const db = await connectToDatabase();
    const collection = db.collection('users');

    // Insert user data into the MongoDB collection
    const result = await collection.insertOne({
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.Username,
      password: data.Password,
    });

    return Response.json({ message: 'User registered successfully', insertedId: result.insertedId });
  } catch (error) {
    console.error('Error:', error);
    return Response.json({ error: 'Failed to register user' });
  }
}
