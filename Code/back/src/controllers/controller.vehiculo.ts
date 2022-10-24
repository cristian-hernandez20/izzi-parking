import { Request, Response } from "express";
import { VehiculosModel } from "../models/model.vehiculo";

export const getVehiculos = async (req: Request, res: Response) => {
  try {
    const data = await VehiculosModel.find({}, { password: 0 });
    res.json(data);
  } catch (error) {
    res.json({ msg: "reser-get" });
  }
};
export const createVehiculos = async (req: Request, res: Response) => {
  try {
    new VehiculosModel(req.body).save((error) => {
      if (error) {
        res.json({ msg: error });
      } else {
        res.json({ S: "success" });
      }
    });
  } catch (error) {
    console.error(error);
  }
};

export const editVehiculos = async (req: Request, res: Response) => {
  try {
    const{id}=req.params
    new VehiculosModel(req.body).save((error) => {
      if (error) {
        res.json({ msg: error });
      } else {
        res.json({ S: "success" });
      }
    });
  } catch (error) {
    console.error(error);
  }
};
