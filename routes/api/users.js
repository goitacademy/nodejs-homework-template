import express from 'express';
import dotenv from 'dotenv';
import Joi from 'joi';

import { auth } from '../../config/config-passport.js';
import { uploadImage } from '../../config/config-multer.js';

dotenv.config();

export const usersRouterFunction = usersService => {
  const { logOutUser, getUser, addUser, loginUser, patchUser, patchAvatar } = usersService;
  const usersRouter = express.Router();

  const schemaEmailPassword = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
    subscription: Joi.string(),
  });

  const schemaSubscription = Joi.object({
    subscription: Joi.string().required(),
  });

  usersRouter.get('/current', auth, async (req, res, next) => {
    const { id: userId } = req.user;
    try {
      const user = await getUser(userId);
      if (!user) {
        return res.status(404).json(`Error! User not found!`);
      }
      const { email, subscription } = user;
      return res.status(200).json({
        status: 'success',
        code: 200,
        data: { email, subscription },
      });
    } catch (err) {
      res.status(500).json(`An error occurred while getting the contact: ${err}`);
    }
  });

  usersRouter.post('/signup', async (req, res, next) => {
    const { body } = req;
    const { error } = schemaEmailPassword.validate(body);

    if (error) {
      return res.status(400).json(`Error: ${error.details[0].message}`);
    }

    try {
      const user = await addUser(body);
      if (user === 409) {
        return res.status(409).json({ message: 'Email in use' });
      }
      const { email, subscription } = user;
      return res.status(201).json({
        status: 'success',
        code: 201,
        user: { email, subscription },
      });
    } catch (err) {
      res.status(500).json(`An error occurred while adding the user: ${err}`);
    }
  });

  usersRouter.post('/login', async (req, res, next) => {
    const { body } = req;
    const { error } = schemaEmailPassword.validate(body);

    if (error) {
      return res.status(400).json(`Error: ${error.details[0].message}`);
    }

    try {
      const user = await loginUser(body);

      if (!user) {
        return res.status(400).json(`Error! Email or password is wrong!`);
      }

      const { email, subscription, token } = user;

      res.status(200).json({
        status: 'success',
        code: 200,
        token: token,
        user: { email, subscription },
      });
    } catch (err) {
      res.status(500).json(`An error occurred while logging the user! ${err}`);
    }
  });

  usersRouter.post('/logout', auth, async (req, res, next) => {
    try {
      const userId = req.user.id;

      const user = await logOutUser(userId);

      if (!user) {
        return res.status(401).json({
          status: 'error',
          code: 401,
          message: 'Unauthorized',
        });
      }

      res.status(204).json();
    } catch (error) {
      res.status(500).json({
        status: 'error',
        code: 500,
        message: 'An error occurred during logout.',
      });
    }
  });

  usersRouter.patch('/', auth, async (req, res, next) => {
    const { id: userId } = req.user;
    const { body } = req;
    const { subscription, userId: id } = body;
    const { error } = schemaSubscription.validate(body);

    if (error) {
      return res.status(400).json(`Error: ${error.details[0].message}`);
    }

    try {
      const updatedStatus = await patchUser(subscription, userId);
      if (updatedStatus === 400) {
        return res.status(400).json('Error! Invalid subscription type!');
      }
      return res.status(200).json({
        status: 'success',
        code: 200,
        data: { updatedStatus },
      });
    } catch (err) {
      res.status(500).json(`An error occurred while updating the user: ${err}`);
    }
  });

  usersRouter.patch('/avatars', auth, uploadImage.single('avatar'), async (req, res) => {
    const file = req.file;
    if (!file) {
      return res.status(400).json('Error! Missing file!');
    }
    const { path } = file;
    const { id: userId } = req.user;
    try {
      const newAvatarPath = await patchAvatar(path, userId);
      return res.status(200).json({
        status: 'success',
        code: 200,
        avatarURL: newAvatarPath,
      });
    } catch (err) {
      res.status(500).json(`An error occurred while updating the avatar: ${err}`);
    }
  });
  return usersRouter;
};
