import express from "express";
import { JwtValidator_ } from "../helpers/validators";
import { createReserva, getReservas,editarReserva } from "../controllers/controller.reserva";

export const RouteReserva = express.Router();

RouteReserva.get("/get&reservas",getReservas);
RouteReserva.post("/create&reserva", createReserva);
RouteReserva.put("/editar&reserva/:id", editarReserva);
RouteReserva.post("/create&reserva", createReserva);
RouteReserva.post("/create&reserva", createReserva);
