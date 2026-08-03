import mongoose, { Schema, Document, Model } from "mongoose";

export interface IVisa extends Document {
  userid?: mongoose.Types.ObjectId;
  fullName: string;
  passportNumber: string;
  nationality: string;
  dateOfBirth?: Date;
  visaType: string;
  status: string;
  createdAt: Date;
  submittedAt?: Date;
}

const VisaSchema: Schema<IVisa> = new Schema({
  userid: { type: Schema.Types.ObjectId, ref: "User", required: false },
  fullName: { type: String, default: "" },
  passportNumber: { type: String, default: "" },
  nationality: { type: String, default: "" },
  dateOfBirth: { type: Date },
  visaType: { type: String, default: "" },
  status: { type: String, default: "Draft" },
  createdAt: { type: Date, default: Date.now },
  submittedAt: { type: Date },
});

export const Visa: Model<IVisa> = mongoose.models.Visa || mongoose.model<IVisa>("Visa", VisaSchema);
