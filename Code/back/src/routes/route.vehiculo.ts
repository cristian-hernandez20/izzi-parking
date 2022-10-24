import express from "express";
import { JwtValidator_ } from "../helpers/validators";
import { getVehiculos, createVehiculos,editVehiculos } from "../controllers/controller.vehiculo";

export const RouteVehiculo = express.Router();


RouteVehiculo.get("/get&vehiculo",getVehiculos);
RouteVehiculo.post("/create&vehiculo",createVehiculos);
RouteVehiculo.put("/edit&vehiculo",editVehiculos);
