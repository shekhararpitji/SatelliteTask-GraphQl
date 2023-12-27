import {  Response } from "express";

import bcrypt from "bcryptjs";
import { User } from "../entity/User";
import { createToken } from "../utils/authUtil";
import { appDataSource } from "../dataSource";
const curr_User = appDataSource.getRepository(User);

export const registerService = async (
  name: string,
  email: string,
  password: string,
  mobile_number: string,
  role: string,
  active: boolean
) => {
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const user = curr_User.create({
      name,
      email,
      password: hashPassword,
      mobile_number,
      role,
      active,
    });

    const saveUser = await appDataSource.manager.save(user);

    if (!saveUser) {
      throw new Error("error in saving user");
    }
    return saveUser;
  } catch (error) {
    console.error(error);
  }
};

export const loginService = async (
  email: string,
  password: string,
  res: Response
) => {
  const user = await curr_User.findOneBy({
    email,
  });

  if (!user) {
    return res.status(404).json({ message: "Not found" });
  }
  const result =await bcrypt.compare(password, user.password);
  if (!result) {
    return res.status(404).json({ message: "Wrong password" });
  } else {
    const access_token = createToken(user.id, user.email);
    return access_token;
  }
};

export const get1Service = async (id: number) => {
  const user = await curr_User.findOneBy({
    id,
  });
  return user;
};

export const getAllService = async () => {
  const user = await curr_User.find();
  return user;
};

export const getUserwithPlans = async (id: number): Promise<User | null> => {
  return await curr_User.findOne({
    where: { id },
    relations: { subscription: true },
  });
};

export const getUserByEmail = async (email:string): Promise<User | null> => {
  return await curr_User.findOne({
    where: { email },
    relations: { subscription: true },
  });
};

export const deleteUserService = async (id: number) => {
  const user = await curr_User.delete({ id });
  return user;
};
