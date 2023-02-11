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
    const isExist = await userService.getUser({ email });
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
    const user = await userService.getUser({
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

module.exports = {
  register,
  login,
};
