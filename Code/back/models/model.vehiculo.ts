import mongoose, { Schema, model, mongo } from "mongoose";
mongoose.pluralize(null);

interface Vehiculos {
  type: string;
  fare: string;
}
const VehiculosSchema = new Schema<Vehiculos>(
  {
    type: {
      type: String,
      required: true,
    },
    fare: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);
export const VehiculosModel = model<Vehiculos>("Vehiculos", VehiculosSchema);
