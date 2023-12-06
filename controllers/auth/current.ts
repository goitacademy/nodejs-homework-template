import { Request, Response } from "express";
import { IUser } from "../../models/user/user";

const getCurrent = async (req: Request, res: Response) => {
  const { email, name }: IUser = req.user as IUser;

  res.json({
    email,
    name,
  });
};

export default getCurrent;
