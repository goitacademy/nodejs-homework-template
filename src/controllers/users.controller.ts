import { Request, Response } from 'express';
import dotenv from 'dotenv';
import sgMail from '@sendgrid/mail';
import crypto from 'crypto';
import gavatar from 'gravatar';
import { responseData } from 'helpers/apiHelpers';
import { DatabaseError, NotFoundError, ValidationError } from 'helpers/errors';
import {
  getUserByEmail,
  getUserByVerificationToken,
  loginService,
  logoutService,
  registerService,
  updateAvatarService,
  updateSubscriptionService,
} from 'services/users.service';
import { IRequest } from 'types/Request.interface';
import { removeFile, resizeImageService } from 'services/file.service';

dotenv.config();
sgMail.setApiKey(process.env.MAIL_API_KEY!);

const sendVerificationMail = async (email: string, verificationToken: string) => {
  try {
    const msg = {
      to: email,
      from: 'dev.andrii.zaimak@ukr.net',
      subject: 'Thank you for registration!',
      text: `Please, confirm your email address  http://localhost:3000/api/users/verify/${verificationToken}`,
      html: `Please, confirm your email address  http://localhost:3000/api/users/verify/${verificationToken}`,
    };
    await sgMail.send(msg);
  } catch (error) {
    console.error((error as sgMail.ResponseError).response.body);
  }
};

export const registerController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const candidate = await getUserByEmail(email);

  if (candidate) {
    throw new DatabaseError('Email is already in use');
  }

  const avatarURL = 'https:' + gavatar.url(email);
  const verificationToken = crypto.randomUUID();
  const user = await registerService({ email, password, avatarURL, verificationToken });

  await sendVerificationMail(email, verificationToken);

  res.status(201).json(responseData({ user }, 201));
};

export const loginController = async (req: Request, res: Response) => {
  const data = await loginService(req.body);

  res.status(200).json(responseData(data, 200));
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

export const verifyController = async (req: IRequest, res: Response) => {
  const { verificationToken } = req.params;
  const user = await getUserByVerificationToken(verificationToken as string);

  if (!user) {
    throw new NotFoundError('User not found');
  }

  await user.updateOne({ verificationToken: null, verify: true });

  res.status(200).json(responseData({ message: 'Verification successful' }, 200));
};

export const sendVerifyMailController = async (req: IRequest, res: Response) => {
  const { email } = req.body;

  const user = await getUserByEmail(email as string);

  if (!user) {
    throw new NotFoundError('User not found');
  }

  if (user.verify) {
    throw new ValidationError('Verification has already been passed');
  }

  const verificationToken = crypto.randomUUID();
  await user.updateOne({ verificationToken });
  sendVerificationMail(user.email, verificationToken);

  res.status(200).json(responseData({ message: `Verification email sent` }, 200));
};
