import { Request, Response } from 'express';
import gavatar from 'gravatar';
import { responseData } from 'helpers/apiHelpers';
import { DatabaseError } from 'helpers/errors';
import {
  getUserByEmail,
  loginService,
  logoutService,
  registerService,
  updateAvatarService,
  updateSubscriptionService,
} from 'services/users.service';
import { IRequest } from 'types/Request.interface';
import { removeFile, resizeImageService } from 'services/file.service';

export const registerController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const candidate = await getUserByEmail(email);

  if (candidate) {
    throw new DatabaseError('Email is already in use');
  }

  const avatarURL = gavatar.url(email);
  const user = await registerService({ email, password, avatarURL });

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
  const { email, subscription, avatarURL } = req.user!;
  res.status(200).json(responseData({ email, subscription, avatarURL }, 200));
};

export const updateUserSubscriptionController = async (req: IRequest, res: Response) => {
  const user = await updateSubscriptionService(req.user?._id!, req.body.subscription);

  res.status(200).json(responseData(user, 200));
};

export const updateUserAvatarController = async (req: IRequest, res: Response) => {
  const { path, filename } = req.file!;
  await resizeImageService(path, filename);
  await removeFile(path);
  const user = await updateAvatarService(req.user?._id!, `avatars/${filename}`);

  res.status(200).json(responseData(user, 200));
};
