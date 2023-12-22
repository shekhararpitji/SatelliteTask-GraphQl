import { NextFunction, Request, Response } from "express";

import { User } from "../entity/User";
// import { get1User } from "../services/roleServices";
import { validateToken } from "../utils/authUtil";
import { appDataSource } from "../dataSource";
const curr_User = appDataSource.getRepository(User);
export const authMiddleware = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const {id} =await validateToken(req);
    req.body.data = await curr_User.findOneBy({id:id});
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json(error);
  }
};

export const isLogedIn = async (req:Request, res:Response, next:NextFunction) => {
  const jsonPayload = await validateToken(req);
  if (!jsonPayload)
    return res.status(403).send({ message: "token is invalid" });

  req.body.data = jsonPayload;
  next();
};

export const isAdmin = async (req:Request, res:Response, next:NextFunction) => {
  const {email} = req.body.data;
  const userData = await curr_User.findOneBy({email:email});

  if (userData && userData.role === "admin") return next();

  res.status(401).send({ message: "you are not admin" });
};

export const isOperator = async (req:Request, res:Response, next:NextFunction) => {
  const payload = req.body.data;
  const userData = await curr_User.findOneBy({email:payload.email});
  if (userData && userData.role === "operator") {
    return next();
  }

  res.status(401).send({ message: "you are not operator or not login" });
};

export const isUser = async (req:Request, res:Response, next:NextFunction) => {
  const payload = req.body.data;
  const userData = await curr_User.findOneBy({email:payload.email});
  if (userData && userData.role === "user") {
    return next();
  }

  res.status(401).send({ message: "you are not user or not login" });
};
