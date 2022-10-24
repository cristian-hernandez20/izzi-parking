import express from "express";
import { JwtValidator_ } from "../helpers/validators";
import { createReserva, getReservas } from "../controllers/controller.reserva";

export const RouteReserva = express.Router();

RouteReserva.get("/get&reservas",getReservas);
RouteReserva.post("/create&reserva", createReserva);
