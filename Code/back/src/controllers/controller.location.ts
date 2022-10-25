import { Request, Response } from "express";
import { LocationModel } from "../models/model.location";

export const addLocation = async (req: Request, res: Response) => {
  console.log("->", req.body);
  try {
    new LocationModel(req.body).save((error) => {
      if (error) {
        res.json({ msg: error });
      } else {
        res.json({ S: "success" });
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
    res.json(edit);
  } catch (error) {
    res.json(error);
    console.error(error);
  }
};
