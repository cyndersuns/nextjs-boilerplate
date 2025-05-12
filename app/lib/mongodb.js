// Import MongoClient from the mongodb package to interact with MongoDB
import { MongoClient } from "mongodb";

// MongoDB URI (connection string) from environment variables (set in .env.local)
const uri = process.env.MONGODB_URI;

// MongoDB client options
const options = {};

// Declare variables to store client and clientPromise
let client;
let clientPromise;

// Checking if the MongoDB URI exists in the environment variables
// If not, throw an error
if (!process.env.MONGODB_URI) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

// Handling different behaviors for development vs production environments
if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable to store the client promise
  // This avoids creating a new MongoDB connection each time the app reloads (e.g., with hot reloading)
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options); // Create a new MongoClient instance with the URI and options
    global._mongoClientPromise = client.connect(); // Store the client connection promise in a global variable
  }
  //  global client promise for the connection
  clientPromise = global._mongoClientPromise;
} else {
  // In production, just create a new MongoClient and connect directly
  client = new MongoClient(uri, options);
  clientPromise = client.connect(); // Connect to MongoDB and store the promise
}

// Export the client promise so it can be used in other parts of the app to access MongoDB
export default clientPromise;

