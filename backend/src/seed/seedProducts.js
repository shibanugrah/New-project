import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import seedProducts from "../data/seedProducts.js";
import Product from "../models/Product.js";

dotenv.config();

async function seedDatabase() {
  const connection = await connectDB();

  if (!connection) {
    console.log("Seeding stopped because MongoDB is not connected.");
    process.exit(1);
  }

  try {
    await Product.deleteMany({});
    await Product.insertMany(seedProducts);

    console.log(`${seedProducts.length} products seeded successfully.`);
    process.exit(0);
  } catch (error) {
    console.error(`Seeding failed: ${error.message}`);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
  }
}

seedDatabase();
