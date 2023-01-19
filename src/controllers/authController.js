import createError from 'http-errors';
import { setSuccessResponse } from '../helpers/setResponse.js';
import {
  login,
  signup,
  logout,
  getCurrentUser,
  updateSubscription,
} from '../services/authService.js';

export const signupController = async (req, res) => {
  try {
    const { email, password, subscription } = req.body;

    const newUser = await signup({ email, password, subscription });

    res.status(201).json(setSuccessResponse(201, newUser));
  } catch (error) {
    if (error?.code === 11000) {
      const field = Object.keys(error.keyValue);
      throw new createError(409, ` ${field} already exists.`);
    }
  }
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  const userData = await login(email, password);

  if (!userData) throw new createError(401, 'Email or password is wrong');

  res.json(setSuccessResponse(200, userData));
};

export const logoutController = async (req, res) => {
  const { userId } = req.user;
  const user = await logout(userId);

  if (!user) throw new createError(401, 'Not authorized');

  res.status(204).send();
};

export const getCurrentUserController = async (req, res) => {
  const { userId } = req.user;
  const user = await getCurrentUser(userId);

  if (!user) throw new createError(401, 'Not authorized');

  res.json(setSuccessResponse(200, user));
};

export const updateSubscriptionController = async (req, res) => {
  const { userId } = req.user;
  const { subscription } = req.body;

  const updatedUser = await updateSubscription(userId, subscription);

  if (!updatedUser) throw new createError(401, 'Not authorized');

  res.json(setSuccessResponse(200, updatedUser));
};
