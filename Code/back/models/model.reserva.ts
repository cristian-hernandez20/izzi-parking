import mongoose, { Schema, model, mongo } from "mongoose";
mongoose.pluralize(null);

interface Reserva {
  time: String;
  date: String;
  zone: string;
  state: string;
  document_user: Number;
  name_user: String;
  type_vehicle: String;
  placa: String;
}
const ReservaSchema = new Schema<Reserva>(
  {
    time: {
      type: String,
      required: true,
    },
    document_user: {
      type: Number,
      required: true,
    },
    name_user: {
      type: String,
      required: true,
    },
    type_vehicle: {
      type: String,
      required: true,
    },
    placa: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    zone: {
      type: String,
      required: false,
    },
    state: {
      type: String,
      required: true,
      default: "ACTIVA",
      enum: ["ACTIVA", "CANCELADA"],
    },
  },
  { versionKey: false }
);
export const ReservaModel = model<Reserva>("Reserva", ReservaSchema);
