import express from "express";
import { JwtValidator_ } from "../helpers/validators";
import { createReserva, getReservas, editarReserva, getReservaId, deleteReserva } from "../controllers/controller.reserva";

export const RouteReserva = express.Router();

RouteReserva.get("/get&reservas", JwtValidator_, getReservas);
RouteReserva.get("/get&reservas/:id", JwtValidator_, getReservaId);
RouteReserva.post("/create&reserva", JwtValidator_, createReserva);
RouteReserva.put("/editar&reserva/:id", JwtValidator_, editarReserva);
RouteReserva.delete("/delete&reserva/:id", JwtValidator_, deleteReserva);
