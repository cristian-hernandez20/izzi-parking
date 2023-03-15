import mongoose, { Schema, model, mongo } from "mongoose";
mongoose.pluralize(null);

interface Entry {
  date_init: string;
  time_init: string;
  date_end: string;
  time_end: string;
  placa: string;
  state: number;
  type_vehicle: string;
  puesto: string;
}
const EntrySchema = new Schema<Entry>(
  {
    date_init: {
      type: String,
    },
    time_init: {
      type: String,
    },
    date_end: {
      type: String,
    },
    time_end: {
      type: String,
    },
    state: {
      type: Number, 
    },
    placa: {
      type: String,
      required: true,
    },
    type_vehicle: {
      type: String,
    },
    puesto: {
      type: String,
    },
  },
  { versionKey: false }
);

export const EntryModel = model<Entry>("Entry", EntrySchema);
