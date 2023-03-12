import mongoose from "mongoose";
import express, { Request, Response, NextFunction } from "express";
const socket = require("socket.io");
import * as routes from "./routes";
import { LocationModel } from "./models/model.location";
require("dotenv").config();

const PORT = process.env.PORT || 9000;
const URI = "mongodb://localhost:27017/IZZI-PARKING";

const PORT_MONGO = process.env.MONGO_URL || URI;
const app = express();
const http = require("http").createServer(app);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, x_token ,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("API funcionado :)");
});
app.use("/api", routes.Users);
app.use("/api", routes.Locations);
app.use("/api", routes.Reservas);
app.use("/api", routes.Vehiculos);
app.use("/api", routes.Entrys);

mongoose
  .connect(`${PORT_MONGO}`)
  .then(() => {
    console.log("Successful connection 🟢  :)");
  })
  .catch((error) => {
    console.log("Error conecting to the DB  🔴 :(");
    console.log(error);
  });
const db = mongoose.connection;
db.once("open", () => {
  console.log("Conexión exitosa a la base de datos");
});
http.listen(PORT, () => console.log("API lisening in the PORT: ", PORT));
export const io = require("socket.io")(http, {
  cors: {
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket: any) => {
  console.log("Nuevo usuario conectado");
  socket.on("mensaje", (data: any) => {
    console.log(`Mensaje recibido: ${data}`);
    io.emit("mensaje", data);
  });
  socket.on("disconnect", () => {
    console.log("Usuario desconectado");
  });
});
