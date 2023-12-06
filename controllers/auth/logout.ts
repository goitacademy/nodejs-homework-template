import { Request, Response } from "express";
import { User, IUser } from "../../models/user/user";

const logout = async (req: Request, res: Response) => {
  const { _id }: IUser = req.user as IUser;
  
  await User.findByIdAndUpdate(_id, { token: "" });

  res.json({
    message: "Logout success",
  });
};

export default logout;
