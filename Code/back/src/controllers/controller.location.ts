import { Request, Response } from "express";
import { LocationModel } from "../models/model.location";

export const addLocation = async (req: Request, res: Response) => {
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
    new LocationModel(req.body).save((error) => {
      if (error) {
        res.json({ msg: error });
      } else {
        res.json({ S: "success" });
      }
    });
  } catch (error) {}
};
