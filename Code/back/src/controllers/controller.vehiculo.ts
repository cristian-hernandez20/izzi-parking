import { Request, Response } from "express";
import { VehiculosModel } from "../models/model.vehiculo";

export const getVehiculos = async (req: Request, res: Response) => {
  try {
    const data = await VehiculosModel.find({});
    res.json(data);
  } catch (error) {
    res.json({ msg: "reser-get" });
  }
};
export const createVehiculo = async (req: Request, res: Response) => {
  try {
    new VehiculosModel(req.body).save((error) => {
      if (error) {
        res.json({ msg: error });
      } else {
        res.json({ S: "V-002", alert: "success" });
      }
    });
  } catch (error) {
    console.error(error);
  }
};

export const editVehiculo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const edit = await VehiculosModel.updateOne({ _id: id }, data, { runValidators: true });
    if (edit) res.json({ S: "V-042", alert: "success" });
    else res.json({ msg: "V-040", alert: "error" });
  } catch (error) {
    res.json(error);
    console.error(error);
  }
};

export const deleteVehiculo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await VehiculosModel.deleteOne({ _id: id });
    if (data) res.json({ S: "V-052", alert: "success" });
    else res.json({ msg: "V-050", alert: "error" });
  } catch (error) {
    res.json(error);
    console.error(error);
  }
};

export const getVehiculo = async (req: Request, res: Response) => {
  try {
    const { type } = req.params;
    const data = await VehiculosModel.findOne({ type: type });
    res.json(data);
  } catch (error) {
    res.json({ msg: "reser-get" });
  }
};
