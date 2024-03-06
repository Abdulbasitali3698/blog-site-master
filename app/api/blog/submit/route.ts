import Blogs from "@/app/blogs/page";
import connectToDatabase from "@/utils/mongodb";

// pages/api/blogs/submit.js
export async function POST(request:Request) {
  const data=await request.json();
  try {
    const db = await connectToDatabase();
    const collection = db.collection('blogs');
    const result = await collection.insertOne({
        title:data.title,
        blogContent:data.content,
    });
    return Response.json({ message: 'data registered successfully', insertedId: result.insertedId });
  } catch (error) {
    console.error('Error:', error);
    return Response.json({ error: 'Failed to register data' });
  }
}