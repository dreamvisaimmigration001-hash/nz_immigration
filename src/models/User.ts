import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  username: string;
  password?: string;
  role: "user" | "employee" | "admin";
  createdAt: Date;
}

const UserSchema: Schema<IUser> = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "employee", "admin"], default: "user" },
  createdAt: { type: Date, default: Date.now },
});

// Avoid OverwriteModelError in Next.js
export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
