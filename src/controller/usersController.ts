import { Request, Response } from "express";
import { IUser, subscriptionType } from "../helpers";
import { userService } from "../services";

const signup = async (req: Request, res: Response) => {
  const { email }: { email: string } = await userService.signup(req.body);

  res.status(200).json({ message: "success", data: { email } });
};

const login = async (req: Request, res: Response) => {
  const {
    searchedUser: { email, subscription },
    token,
  } = await userService.login(req.body);

  res.status(200).json({
    message: "success",
    data: { user: { email, subscription }, token },
  });
};

const logout = async (req: Request, res: Response) => {
  await userService.logout(req.body.user);

  res.status(204).json();
};

const current = async (req: Request, res: Response) => {
  const { email, subscription } = await userService.current(req.body.user);

  res.status(200).json({
    message: "success",
    data: { user: { email, subscription } },
  });
};

const subscribe = async (req: Request, res: Response) => {
  const {
    user,
    subscription: subscriptionStr,
  }: { user: IUser; subscription: subscriptionType } = req.body;

  const { email, subscription } = await userService.subscribe(
    user,
    subscriptionStr
  );

  res.status(200).json({
    message: "User subscription updated",
    data: { user: { email, subscription } },
  });
};

export { signup, login, logout, current, subscribe };
