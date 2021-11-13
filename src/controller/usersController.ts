import { Request, Response, NextFunction } from "express";
import { userService } from "../services";

const signup = async (req: Request, res: Response, _: NextFunction) => {
  const { email } = await userService.signup(req.body);

  res.status(200).json({ message: "success", data: { email } });
};

const login = async (req: Request, res: Response, _: NextFunction) => {
  const {
    searchedUser: { email, subscription },
    token,
  } = await userService.login(req.body);

  res.status(200).json({
    message: "success",
    data: { user: { email, subscription }, token },
  });
};

const logout = async (req: Request, res: Response, _: NextFunction) => {
  await userService.logout(req.body.user);

  res.status(204).json();
};

const current = async (req: Request, res: Response, _: NextFunction) => {
  const { email, subscription } = await userService.current(req.body.user);

  res.status(200).json({
    message: "success",
    data: { user: { email, subscription } },
  });
};

export { signup, login, logout, current };
