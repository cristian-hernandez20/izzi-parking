import express from "express";
import { JwtValidator_ } from "../helpers/validators";
import { login, createUser, getUsers } from "../controllers/controller.user";

export const RouteUser = express.Router();

RouteUser.get("/login", login);
RouteUser.get("/get&users", JwtValidator_, getUsers);
RouteUser.post("/create&user", JwtValidator_, createUser);
