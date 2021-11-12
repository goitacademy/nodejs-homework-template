import { Request, Response, NextFunction } from "express";
import { userService } from "../services";

const signupUser = async (req: Request, res: Response, __: NextFunction) => {
  const { email } = await userService.signupUser(req.body);

  res.status(200).json({ message: "success", data: { email } });
};

const loginUser = async (req: Request, res: Response, __: NextFunction) => {
  const {
    searchedUser: { email, subscription },
    token,
  } = await userService.loginUser(req.body);

  res.status(200).json({
    message: "success",
    data: { user: { email, subscription }, token },
  });
};

export { signupUser, loginUser };
