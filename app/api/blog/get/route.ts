import connectToDatabase from "@/utils/mongodb";

export async function GET() {
  try {
      const db = await connectToDatabase();
      const collection = db.collection('blogs');
      const blogs = await collection.find().toArray(); // Fetch all blogs from the database
      return Response.json({ blogs });
  } catch (error) {
      console.error('Error:', error);
      return Response.json({ error: 'Failed to fetch data' });
  }
}