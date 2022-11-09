import express from "express";
import { JwtValidator_ } from "../helpers/validators";
import { getVehiculos, getVehiculo, createVehiculo, editVehiculo, deleteVehiculo } from "../controllers/controller.vehiculo";

export const RouteVehiculo = express.Router();

RouteVehiculo.get("/get&vehiculos", JwtValidator_, getVehiculos);
RouteVehiculo.post("/create&vehiculo", JwtValidator_, createVehiculo);
RouteVehiculo.put("/edit&vehiculo/:id", JwtValidator_, editVehiculo);
RouteVehiculo.delete("/delet&vehiculo/:id", JwtValidator_, deleteVehiculo);
RouteVehiculo.get("/get&vehiculo/:placa", JwtValidator_, getVehiculo);
