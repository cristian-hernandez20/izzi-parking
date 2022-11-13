import mongoose, { Schema, model, mongo } from "mongoose";
mongoose.pluralize(null);

interface Entry {
  date_init: string;
  time_init: string;
  date_end: string;
  time_end: string;
  placa: string;
  type_vehicle: string;
  puesto: string;
}
const EntrySchema = new Schema<Entry>(
  {
    date_init: {
      type: String,
      required: true,
    },
    time_init: {
      type: String,
      required: true,
    },
    date_end: {
      type: String,
    },
    time_end: {
      type: String,
    },
    placa: {
      type: String,
      required: true,
    },
    type_vehicle: {
      type: String,
      required: true,
    },
    puesto: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);
export const EntryModel = model<Entry>("Entry", EntrySchema);
