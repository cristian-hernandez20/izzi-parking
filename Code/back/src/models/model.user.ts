import mongoose, { Schema, model, mongo } from "mongoose";
mongoose.pluralize(null);

interface Users {
  type_document: String;
  phone_number: string;
  level_user: string;
  last_name: string;
  document: String;
  password: string;
  email: String;
  state: string;
  name: string;
}
const users_schema = new Schema<Users>(
  {
    type_document: {
      type: String,
      required: true,
      enum: ["0", "1", "2"],
    },
    password: {
      type: String,
      required: true,
    },
    document: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
    },
    level_user: {
      type: String,
      default: "USER",
      enum: ["ADMIN", "USER", "SP"],
      required: true,
    },
    state: {
      type: String,
      default: "ACTIVE",
      enum: ["ACTIVE", "INACTIVE"],
      required: true,
    },
  },
  { versionKey: false }
);
export const User_Model = model<Users>("Users", users_schema);
