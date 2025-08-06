import { validateToken } from "./../utils/authUtil";
import { Request } from "express";
import { isValid } from "../interfaces.td";
import { getUserByEmail } from "../services/roleServices";

export const reqContext = async (req: Request) => {
  const check: isValid = {
    isLogin: false,
    role: "",
  };
  try {
    const userPayload = await validateToken(req);

    if (userPayload) {
      check.isLogin = true;
      if (userPayload && userPayload.email) {
        const user = await getUserByEmail(userPayload.email);
        check.role = user?.role as string;
      }
    }
  } catch (err) {
    throw new Error("Authentication failed");
  }

  return check;
};
