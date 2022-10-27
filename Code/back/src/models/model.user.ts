import mongoose, { Schema, model, mongo } from "mongoose";
mongoose.pluralize(null);

interface Users {
  phone_number: string;
  level_user: string;
  last_name: string;
  name: string;
  password: string;
  document: string;
  username: String;
  state: string;
}

const users_schema = new Schema<Users>(
  {
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
    username: {
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
      required: true,
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
