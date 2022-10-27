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
        res.json({ S: "success" });
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
    res.json(edit);
  } catch (error) {
    res.json(error);
    console.error(error);
  }
};

export const deleteVehiculo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await VehiculosModel.deleteOne({ _id: id });
    res.json(data);
  } catch (error) {
    res.json(error);
    console.error(error);
  }
};

export const getVehiculo = async (req: Request, res: Response) => {
  try {
    const { placa } = req.params;
    const data = await VehiculosModel.findOne({ placa: placa });
    res.json(data);
  } catch (error) {
    res.json({ msg: "get-vehiculo" });
  }
};
