import mongoose, { Schema, model, mongo } from "mongoose";
mongoose.pluralize(null);

interface Reserva {
  hora: string;
  fecha: string;
  puesto: string;
  estado: string;
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
      required: false,
    },
  },
  { versionKey: false }
);
export const ReservaModel = model<Reserva>("Reserva", ReservaSchema);
