/* eslint-disable @typescript-eslint/no-require-imports */
const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/immigration";

async function upgradeToAdmin() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB.");

    const db = mongoose.connection.db;
    
    // Find the user 'dramanjy' and upgrade their role to 'admin'
    const result = await db.collection("users").updateOne(
      { username: "dramanjy" },
      { $set: { role: "admin" } }
    );

    if (result.matchedCount === 0) {
      console.log("User 'dramanjy' not found in the database. Please check the username.");
    } else {
      console.log("Successfully upgraded 'dramanjy' to admin!");
    }
  } catch (error) {
    console.error("Error upgrading user:", error);
  } finally {
    mongoose.disconnect();
  }
}

upgradeToAdmin();
