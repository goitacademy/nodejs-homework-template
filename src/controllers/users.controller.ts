import { Request, Response } from 'express';
import { responseData } from 'helpers/apiHelpers';
import { DatabaseError } from 'helpers/errors';
import {
  getUserByEmail,
  loginService,
  logoutService,
  registerService,
  updateSubscriptionService,
} from 'services/users.service';
import { IRequest } from 'types/Request.interface';

export const registerController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const candidate = await getUserByEmail(email);

  if (candidate) {
    throw new DatabaseError('Email is already in use');
  }

  const user = await registerService({ email, password });

  res.status(201).json(responseData({ user }, 201));
};

export const loginController = async (req: Request, res: Response) => {
  const data = await loginService(req.body);

  res.status(201).json(responseData(data, 201));
};

export const logoutController = async (req: IRequest, res: Response) => {
  await logoutService(req.user!._id!);

  res.sendStatus(204);
};

export const currentUserController = async (req: IRequest, res: Response) => {
  const { email, subscription } = req.user!;
  res.status(200).json(responseData({ email, subscription }, 200));
};

export const updateUserSubscriptionController = async (req: IRequest, res: Response) => {
  const user = await updateSubscriptionService(req.user?._id!, req.body.subscription);

  res.status(200).json(responseData(user, 200));
};
