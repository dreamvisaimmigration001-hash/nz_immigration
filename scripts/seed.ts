import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const MONGODB_URI = "mongodb://127.0.0.1:27017/immigration";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "employee", "admin"], default: "user" },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB.");

    const existingUser = await User.findOne({ username: "dramanjy" });
    if (existingUser) {
      console.log("Employee 'dramanjy' already exists, updating password.");
      const hashedPassword = await bcrypt.hash("aman1234", 10);
      existingUser.password = hashedPassword;
      await existingUser.save();
    } else {
      const hashedPassword = await bcrypt.hash("aman1234", 10);
      await User.create({
        username: "dramanjy",
        password: hashedPassword,
        role: "employee",
      });
      console.log("Employee 'dramanjy' created successfully.");
    }
    
    mongoose.disconnect();
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
}

seed();
