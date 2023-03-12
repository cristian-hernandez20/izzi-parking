import { Request, Response } from "express";
import { LocationModel } from "../models/model.location";
import { io } from "../index";

export const addLocation = async (req: Request, res: Response) => {
  try {
    new LocationModel(req.body).save((error, savedObj) => {
      if (error) {
        res.json({ msg: error });
      } else {
        res.json({ S: "Z-002", alert: "success", data: savedObj });
      }
    });
  } catch (error) {}
};

export const getAllLocation = async (req: Request, res: Response) => {
  try {
    const data = await LocationModel.find({});
    res.json(data);
  } catch (error) {
    res.json({ msg: "locations-get" });
  }
};

export const deleteLocation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await LocationModel.deleteOne({ _id: id });
    res.json(data);
  } catch (error) {
    res.json(error);
    console.error(error);
  }
};

export const editarLocation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const edit = await LocationModel.updateOne({ _id: id }, data, { runValidators: true });

    if (edit) res.json({ S: "Z-042", alert: "success" });
    else res.json({ S: "Z-040", alert: "error" });
  } catch (error) {
    res.json(error);
    console.error(error);
  }
};
export const cambiarEstadoPuesto = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    await LocationModel.updateOne({ name }, req.body, { runValidators: true });
    const datos = await LocationModel.find();
    io.emit("mensaje", datos);
  } catch (error) {
    res.json(error);
    console.error(error);
  }
};
