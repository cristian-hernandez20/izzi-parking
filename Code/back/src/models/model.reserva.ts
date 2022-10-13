import mongoose, { Schema, model, mongo } from "mongoose";

mongoose.pluralize(null);

interface Reserva {
  hora: string;
  fecha: string;
  puesto: string;
  estado: string;
  usuario: Object;
}
const ReservaSchema = new Schema<Reserva>(
  {
    hora: {
      type: String,
      required: true,
    },
    fecha: {
      type: String,
      required: true,
    },
    puesto: {
      type: String,
      required: false,
    },
    estado: {
      type: String,
      default: "1",
      enum: ["0", "1", "2"],
      required: false,
    },
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  },
  { versionKey: false }
);
export const ReservaModel = model<Reserva>("Reserva", ReservaSchema);
