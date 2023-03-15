import { Request, Response } from "express";
import { EntryModel } from "../models/model.entry";

export const getEntrys = async (req: Request, res: Response) => {
  try {
    const data = await EntryModel.find({});
    res.json(data);
  } catch (error) {
    res.json({ msg: "reser-get" });
  }
};
export const createEntry = async (req: Request, res: Response) => {
  try {
    const RES = await getEntryExist(req, res);

    if (RES == 1) {
      new EntryModel(req.body).save((error, savedObj) => {
        if (error) {
          console.log("🚀 ~ error:", error);
          res.json({ msg: error });
        } else {
          res.json({ S: "E-002", alert: "success", data: savedObj });
        }
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export const editEntry = async (req: Request, res: Response) => {
  try {
    const { placa } = req.body;
    const data = {
      date_end: req.body.date_init,
      time_end: req.body.time_init,
      state: 2,
      type_vehicle: "CARRO",
      PUESTO: "A1",
    };
    const edit = await EntryModel.updateOne({ placa, state: 1 }, data, { runValidators: true });
    if (edit) res.json({ S: "E-042", alert: "success" });
    else res.json({ msg: "E-040", alert: "error" });
  } catch (error) {
    res.json(error);
    console.error(error);
  }
};

export const deleteEntry = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await EntryModel.deleteOne({ _id: id });
    if (data) res.json({ S: "E-052", alert: "success" });
    else res.json({ msg: "E-050", alert: "error" });
  } catch (error) {
    res.json(error);
    console.error(error);
  }
};
export const getEntry = async (req: Request, res: Response) => {
  try {
    const { placa } = req.params;
    const data = await EntryModel.findOne({ placa: placa });

    res.json(data);
  } catch (error) {
    res.json({ msg: error });
  }
};
export const getEntryExist = async (req: Request, res: Response) => {
  try {
    const { placa } = req.body;
    const data = await EntryModel.findOne({ placa: placa, state: 1 });
    if (data?.state == 1) return editEntry(req, res);
    else return 1;
  } catch (error) {
    res.json({ msg: error });
  }
};
