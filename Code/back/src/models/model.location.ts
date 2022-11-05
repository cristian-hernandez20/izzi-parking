import mongoose, { Schema, model, mongo } from "mongoose";
mongoose.pluralize(null);

interface Location {
  type: string;
  state: string;
  name: string;
}
const LocationSchema = new Schema<Location>(
  {
    type: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      default: "0",
      required: true,
      enum: ["0", "1", "2"],
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { versionKey: false }
);
export const LocationModel = model<Location>("Location", LocationSchema);
