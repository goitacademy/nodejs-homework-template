import express from 'express';

import { listUsers, addUser, loginUser } from '../../models/users.js';

export const usersRouter = express.Router();

usersRouter.get('/', async (req, res, next) => {
  try {
    const users = await listUsers();

    return res.json({
      status: 'success',
      code: 200,
      data: { users },
    });
  } catch (err) {
    res.status(500).json(`An error occurred while getting the user list: ${err}`);
  }
});

usersRouter.post('/signup', async (req, res, next) => {
  const { body } = req;

  if (Object.keys(body).length === 0) {
    return res.status(400).json('Error! Missing fields! Empty request is not allowed');
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

  if (Object.keys(body).length === 0) {
    return res.status(400).json('Error! Missing fields! Empty request is not allowed');
  }

  try {
    const user = await loginUser(body);

    if (!user) {
      return res.status(400).json(`Error! Email or password is wrong!`);
    }

    const { email, subscription, token } = user;

    return res.status(200).json({
      status: 'success',
      code: 200,
      token: token,
      user: { email, subscription },
    });
  } catch (err) {
    res.status(500).json(`An error occurred while adding the user: ${err}`);
  }
});
