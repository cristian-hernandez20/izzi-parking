import { json, Request, Response } from "express";
import { generarJwt } from "../helpers/jwtGenerator";
import { User_Model } from "../models/model.user";

export const login = async (req: Request, res: Response) => {
  try {
    const { user, password } = req.query;

    const data = await User_Model.findOne(
      {
        $and: [{ email: user }, { password: password }],
      },
      { password: 0 }
    );
    if (data) {
      const DATA = data;
      const TOKEN = await generarJwt(data.id);
      res.json({ DATA, TOKEN });
    } else res.json({ msg: "user_2" });
  } catch (error) {
    res.json({ msg: error });
  }
};
export const getUsers = async (req: Request, res: Response) => {
  try {
    const data = await User_Model.find({}, { password: 0 });
    res.json(data);
  } catch (error) {
    res.json({ msg: "user-get" });
  }
};
export const createUser = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    new User_Model(req.body).save((error) => {
      if (error) {
        res.json({ msg: error });
      } else {
        res.json({ S: "user_post", alert: "success" });
      }
    });
  } catch (error) {
    console.error(error);
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { document } = req.params;
    const data = await User_Model.findOne({ document: document });
    res.json(data);
  } catch (error) {
    res.json({ msg: "get-user" });
  }
};
export const putUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const data = req.body;
    const edit = await User_Model.updateOne({ _id: id }, data, { runValidators: true });
    if (edit) res.json({ S: "user_put" });
    else res.json({ msg: "user_put_e" });
  } catch (error) {
    res.json({ msg: error });
    console.error(error);
  }
};

export const putUserPassword = async (req: Request, res: Response) => {
  try {
    const { id, password } = req.params;
    const data = req.body;

    const edit = await User_Model.updateOne(
      {
        $and: [{ _id: id }, { password: password }],
      },
      data,
      { runValidators: true }
    );
    console.log("editar", edit);
    if (edit) {
      res.json({ S: "user_put" });
    } else {
      res.json({ msg: "user_put_e" });
    }
  } catch (error) {
    res.json(error);
    console.error(error);
  }
};
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await User_Model.deleteOne({ _id: id });
    res.json(data);
  } catch (error) {
    res.json(error);
    console.error(error);
  }
};
