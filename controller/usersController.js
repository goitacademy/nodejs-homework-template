const userService = require('../services/userService');
const JoiSchema = require('../schemas/usersSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.SECRET;

const register = async (req, res, next) => {
  try {
    let { password, email, subscription } = await req.body;
    if (!subscription) {
      subscription = 'starter';
    }
    const isValid = JoiSchema.allRequired.validate({
      password,
      email,
      subscription,
    });
    if (isValid.error) {
      res.status(400).json({
        Status: '400 Bad Request',
        'Content-Type': 'application/json',
        ResponseBody: { message: isValid.error.details[0].message },
      });
      return;
    }
    const isExist = await userService.getUserByEmail({ email });
    if (isExist) {
      res.status(409).json({
        Status: '409 Conflict',
        'Content-Type': 'application/json',
        ResponseBody: {
          message: 'Email in use',
        },
      });
      return;
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await userService.addUser({
      password: hash,
      email,
      subscription,
    });
    if (!user) {
      res.status(409).json({
        Status: '409 Conflict',
        'Content-Type': 'application/json',
        ResponseBody: {
          message: "Can't create user",
        },
      });
    }
    res.status(201).json({
      Status: '201 Created',
      'Content-Type': 'application/json',
      ResponseBody: { user },
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    let { password, email, subscription } = await req.body;
    subscription = 'starter';
    const isValid = JoiSchema.allRequired.validate({
      password,
      email,
      subscription,
    });
    if (isValid.error) {
      res.status(400).json({
        Status: '400 Bad Request',
        'Content-Type': 'application/json',
        ResponseBody: { message: isValid.error.details[0].message },
      });
      return;
    }
    const user = await userService.getUserByEmail({
      email,
    });
    if (!user) {
      res.status(401).json({
        Status: '401 Unauthorized',
        'Content-Type': 'application/json',
        ResponseBody: {
          message: 'Email or password is wrong',
        },
      });
      return;
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.status(401).json({
        Status: '401 Unauthorized',
        'Content-Type': 'application/json',
        ResponseBody: {
          message: 'Email or password is wrong',
        },
      });
      return;
    }

    const payload = {
      id: user.id,
      username: user.email,
    };
    const token = jwt.sign(payload, secret, { expiresIn: '1h' });
    await userService.updateUserToken({ _id: user.id, body: { token } });
    res.status(200).json({
      Status: '200 OK',
      'Content-Type': 'application/json',
      ResponseBody: {
        token,
        user: {
          email,
          subscription,
        },
      },
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const logout = async (req, res, next) => {
  try {
    const { _id } = await req.user;
    const user = await userService.getUserById({ _id });
    if (!user) {
      res.status(401).json({
        Status: '401 Unauthorized',
        'Content-Type': 'application/json',
        ResponseBody: {
          message: 'Not authorized',
        },
      });
      return;
    }
    await userService.updateUserToken({
      _id: user.id,
      body: { token: null },
    });
    res.status(204).json({
      Status: '204 No Content',
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const current = async (req, res, next) => {
  try {
    const { email } = req.user;
    const user = await userService.getUserByEmail({ email });
    if (!user) {
      res.status(401).json({
        Status: '401 Unauthorized',
        'Content-Type': 'application/json',
        ResponseBody: {
          message: 'Not authorized',
        },
      });
      return;
    }
    res.json({
      Status: '200 OK',
      'Content-Type': 'application/json',
      ResponseBody: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = {
  register,
  login,
  logout,
  current,
};
