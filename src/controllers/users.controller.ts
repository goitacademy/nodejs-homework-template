import { Request, Response } from 'express';
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

sgMail.setApiKey(process.env.MAIL_API_KEY!);

export const registerController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const candidate = await getUserByEmail(email);

  if (candidate) {
    throw new DatabaseError('Email is already in use');
  }

  const avatarURL = gavatar.url(email);
  const verificationToken = crypto.randomUUID();
  const user = await registerService({ email, password, avatarURL, verificationToken });
  // TODO: send mail
  const msg = {
    to: 'dev.andrii.zaimak@gmail.com', // Change to your recipient
    from: 'goit.dev.test.user@gmail.com', // Change to your verified sender
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent');
    })
    .catch((error) => {
      console.error(error.response.body);
    });

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
  const { verificationToken } = req.query;
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

  // TODO: Send mail
  await user.updateOne({ verificationToken: crypto.randomUUID() });

  res.status(200).json(responseData({ message: `Verification email sent` }, 200));
};
