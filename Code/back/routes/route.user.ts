import express from "express";
import { JwtValidator_ } from "../helpers/validators";
import { login, createUser, getUser, getUsers, putUser, deleteUser } from "../controllers/controller.user";

export const RouteUser = express.Router();

RouteUser.get("/login", login);
RouteUser.get("/get&users", JwtValidator_, getUsers);
RouteUser.post("/create&users", createUser);
RouteUser.get("/get&user/:document", getUser);
RouteUser.put("/put&user/:id", JwtValidator_, putUser);
RouteUser.put("/put&user&password/:id/:password", JwtValidator_, putUser);
RouteUser.delete("/delete&user/:id", deleteUser);
