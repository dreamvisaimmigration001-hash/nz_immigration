import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISponsorship extends Document {
  userid?: mongoose.Types.ObjectId;
  type: string;
  employer: string;
  status: string;
  validUntil?: Date;
  createdAt: Date;
}

const SponsorshipSchema: Schema<ISponsorship> = new Schema({
  userid: { type: Schema.Types.ObjectId, ref: "User", required: false },
  type: { type: String, default: "" },
  employer: { type: String, default: "" },
  status: { type: String, default: "Pending" },
  validUntil: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

export const Sponsorship: Model<ISponsorship> = mongoose.models.Sponsorship || mongoose.model<ISponsorship>("Sponsorship", SponsorshipSchema);
