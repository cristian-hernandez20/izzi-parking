import express from "express";
import { JwtValidator_ } from "../helpers/validators";
import { getVehiculos, createVehiculo,editVehiculo,deleteVehiculo } from "../controllers/controller.vehiculo";

export const RouteVehiculo = express.Router();


RouteVehiculo.get("/get&vehiculo",getVehiculos);
RouteVehiculo.post("/create&vehiculo",createVehiculo);
RouteVehiculo.put("/edit&vehiculo/:id",editVehiculo);
RouteVehiculo.delete("/delet&vehiculo/:id",deleteVehiculo);
