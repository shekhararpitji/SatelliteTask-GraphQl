import { Request, Response } from "express";
import { appDataSource } from "../dataSource";

import {
  loginService,
  registerService,
  get1Service,
  getAllService,
  deleteUserService,
} from "../services/roleServices";
import { validateToken } from "../utils/authUtil";
import { User } from "../entity/User";
const curr_User = appDataSource.getRepository(User);

export const registerCtrl = async (req: Request, res: Response) => {
  try {
    const { name, email, password, cPassword, mobile_number, role, active } =
      req.body;
    if (password !== cPassword) {
      res
        .status(400)
        .send({ message: "Password and Confirm password does not match" });
    }

    const existingUserEmail = await curr_User.findOneBy({
      email,
    });
    if (existingUserEmail) {
      res.status(409).send({ message: "Email already register" });
    }
    const user = await registerService(
      name,
      email,
      password,
      mobile_number,
      role,
      active
    );

    if (user) {
      return res.status(201).send({ message: ` Registered successfully ..` });
    }
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

export const loginCtrl = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const access_token = await loginService(email, password, res);
    res.status(200).json({ jwt: access_token });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

export const getAllCtrl = async (req: Request, res: Response) => {
  try {
    const user = await getAllService();
    if (!user) {
      return res.status(404).send({ message: "Not found" });
    }
    res.status(200).send({ user });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

export const get1Ctrl = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await get1Service(+id);
    if (!user) {
      return res.status(404).send({ message: "user not found" });
    }
    res.status(200).send({ user });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

export const deleteCtrl = async (req: Request, res: Response) => {
  try {
    const id = +req.params.id;
    const access_token = await validateToken(req);
    if (!access_token) {
      res.status(401).send("invalid token");
    }
    const user = await deleteUserService(id);

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};
