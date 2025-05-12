// Import the MongoDB client promise from the mongodb utility file (lib/mongodb.js)
import clientPromise from "../../lib/mongodb";

// Define the API route handler function, which is asynchronous
// It will handle HTTP requests (GET, POST, etc.)
export default async function handler(req, res) {
  // Wait for the MongoDB client connection to be established
  const client = await clientPromise;

  // Connect to the "mongodb" database
  const db = client.db("mongodb");

  // Access the "users" collection in the "mongodb" database
  // This fetches all documents from the "users" collection
  const users = await db.collection("users").find({}).toArray();

  // Send a JSON response back to the client with the fetched users
  // Status 200 indicates the request was successful
  res.status(200).json(users);
}

