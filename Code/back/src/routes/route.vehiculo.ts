import express from "express";
import { JwtValidator_ } from "../helpers/validators";
import { getVehiculos, getVehiculo, createVehiculo,editVehiculo,deleteVehiculo } from "../controllers/controller.vehiculo";

export const RouteVehiculo = express.Router();


RouteVehiculo.get("/get&vehiculos",getVehiculos);
RouteVehiculo.post("/create&vehiculo",createVehiculo);
RouteVehiculo.put("/edit&vehiculo/:id",editVehiculo);
RouteVehiculo.delete("/delet&vehiculo/:id",deleteVehiculo);
RouteVehiculo.get("/get&vehiculo/:placa",getVehiculo);
