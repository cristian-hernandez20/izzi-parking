import mongoose, { Schema, model, mongo } from "mongoose";
mongoose.pluralize(null);

interface Vehiculos {
  tipo: string;
  placa: String;
  color: String;
}
const VehiculosSchema = new Schema<Vehiculos>(
  {
    tipo: {
      type: String,
      required: true,
    },
    placa: {
      type: String,
      required: true,
      unique:true
    },
    color: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);
export const VehiculosModel = model<Vehiculos>("Vehiculos", VehiculosSchema);
