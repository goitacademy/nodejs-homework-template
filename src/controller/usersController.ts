import { Request, Response, NextFunction } from "express";
import { userService } from "../services";

const signupUser = async (req: Request, res: Response, __: NextFunction) => {
  const user = await userService.signupUser(req.body);

  res.status(200).json({ message: "success", data: { user } });
};

export { signupUser };
