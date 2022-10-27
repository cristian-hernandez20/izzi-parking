import mongoose, { Schema, model, mongo } from "mongoose";
mongoose.pluralize(null);

interface Users {
  password_validate: string;
  type_document: Number;
  phone_number: string;
  level_user: string;
  last_name: string;
  document: string;
  password: string;
  username: String;
  email: String;
  state: string;
  name: string;
}
const users_schema = new Schema<Users>(
  {
    password_validate: {
      type: String,
      required: true,
    },
    type_document: {
      type: Number,
      required: true,
      enum: [1, 2, 3],
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
    username: {
      type: String,
      required: true,
      unique: true,
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
