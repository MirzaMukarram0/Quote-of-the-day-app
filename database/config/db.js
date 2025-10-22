import mongoose from "mongoose";

/**
 * Connect to MongoDB database
 * @param {string} uri - MongoDB connection URI
 */
export async function connectDB(uri) {
  try {
    const mongoUri = uri || process.env.MONGODB_URI || "mongodb://localhost:27017/quoteapp";
    
    await mongoose.connect(mongoUri);
    
    console.log("✅ MongoDB connected successfully");
    console.log(`📍 Database: ${mongoose.connection.name}`);
    console.log(`🔗 Host: ${mongoose.connection.host}`);
    
    return mongoose.connection;
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
}

/**
 * Close MongoDB connection
 */
export async function closeDB() {
  try {
    await mongoose.connection.close();
    console.log("🔌 MongoDB connection closed");
  } catch (error) {
    console.error("Error closing MongoDB connection:", error);
  }
}

/**
 * Clear all collections in the database
 */
export async function clearDatabase() {
  try {
    const collections = await mongoose.connection.db.collections();
    
    for (let collection of collections) {
      await collection.deleteMany({});
    }
    
    console.log("🗑️  Database cleared");
  } catch (error) {
    console.error("Error clearing database:", error);
    throw error;
  }
}

export default { connectDB, closeDB, clearDatabase };
