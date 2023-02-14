import { Request, Response } from 'express';
import { responseData } from 'helpers/apiHelpers';
import { DatabaseError } from 'helpers/errors';
import { getUserByEmail, registerService } from 'services/users.service';

export const registerController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const candidate = await getUserByEmail(email);

  if (candidate) {
    throw new DatabaseError('Email is already in use');
  }

  const user = await registerService({ email, password });

  res.status(201).json(responseData({ user }, 201));
};
