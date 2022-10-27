import mongoose from "mongoose";
import express, { Request, Response, NextFunction } from "express";
import * as routes from "./routes";
require("dotenv").config();

const PORT = process.env.PORT || 9000;
const app = express();

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

//********Routes*******

app.get("/", (req: Request, res: Response) => {
  res.send("API funcionado :)");
});
app.use("/api", routes.Users);
app.use("/api", routes.Locations);
app.use("/api", routes.Reservas);
app.use("/api", routes.Vehiculos);

//********Routes*******

console.clear();

//******Conection MONGODB****** */
mongoose
  .connect(`${process.env.MONGO_URL}`)
  .then(() => {
    console.log("Successful connection 🟢  :)");
  })
  .catch((error) => {
    console.log("Error conecting to the DB  🔴 :(");
    console.log(error);
  });

app.listen(PORT, () => console.log("API lisening in the PORT: ", PORT));
