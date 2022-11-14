import express from "express";
import { JwtValidator_ } from "../helpers/validators";
import { getAllLocation, addLocation, deleteLocation, editarLocation } from "../controllers/controller.location";

export const RouterLocation = express.Router();

RouterLocation.get("/get&locations", getAllLocation);
RouterLocation.post("/add&location", JwtValidator_, addLocation);
RouterLocation.delete("/delete&location/:id", deleteLocation);
RouterLocation.put("/editar&location/:id", editarLocation);
