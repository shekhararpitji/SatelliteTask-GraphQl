import { Request, Response } from "express";

const JWT = require("jsonwebtoken");
export const createToken = (id:number,email:string) => {
  const payload = {
    id: id,
    email:email
  };
  const token = JWT.sign(payload, process.env.SECRET);
  return token;
};

export const validateToken = async (req:Request) => {
  const token = req.get("authorization")?.split(" ")[1];
  const payload = JWT.verify(token, process.env.SECRET);
  return payload;
};
  