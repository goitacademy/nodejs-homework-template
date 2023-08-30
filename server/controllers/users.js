import jwt from "jsonwebtoken";
import "dotenv/config";
import usersService from "../services/users.js";
import User from "../models/user.js";
import {
  userRegisterSchema,
  userLoginSchema,
  userLogoutSchema,
  userUpdateSubSchema,
} from "../utils/validation.js";

const secret = process.env.SECRET_KEY;

const getAll = async (req, res, next) => {
  try {
    const { pagination } = req;
    const { startIndex, endIndex } = pagination;
    const results = await usersService.getAll();
    const users = results.slice(startIndex, endIndex);
    return res.json({
      status: "success",
      code: 200,
      data: {
        users: users,
      },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const getById = async (req, res, next) => {
  try {
    const { params, user } = req;
    const { id } = params;
    const results = await usersService.getOne(id, user.id);
    if (!results) {
      return res.status(404).json({
        status: "not-found",
        code: 404,
        data: {
          user: results,
        },
      });
    }
    return res.json({
      status: "success",
      code: 200,
      data: {
        user: results,
      },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const getCurrent = async (req, res, next) => {
  try {
    const { id } = req.user;
    const results = await usersService.getOne(id);
    if (!results) {
      return res.status(404).json({
        status: "not-found",
        code: 404,
        data: {
          user: results,
        },
      });
    }
    return res.json({
      status: "success",
      code: 200,
      data: {
        user: results,
      },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const register = async (req, res, next) => {
  const { email, password } = req.body;
  await userRegisterSchema.validateAsync(req.body);
  const user = await User.findOne({ email }).lean();

  if (user) {
    return res.status(409).json({
      status: "error",
      code: 409,
      message: "Email is already in use",
      data: "Conflict",
    });
  }
  try {
    const newUser = new User({ email });
    newUser.setPassword(password);
    await newUser.save();
    return res.json({
      status: "success",
      code: 201,
      data: {
        user: {
          id: newUser.id,
          email: newUser.email,
          subscription: newUser.subscription,
        },
        message: "Registration successful",
      },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  await userLoginSchema.validateAsync(req.body);
  const user = await User.findOne({ email });

  if (!user || !user.validPassword(password)) {
    return res.status(401).json({
      status: "Unauthorized",
      code: 401,
      message: "Email or password is wrong",
      data: "Bad request",
    });
  }

  const payload = {
    id: user.id,
    email: user.email,
    subscription: user.subscription,
  };

  try {
    const token = jwt.sign(payload, secret, { expiresIn: "1h" });
    await usersService.update(user.id, { token: token });
    return res.json({
      status: "success",
      code: 200,
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          subscription: user.subscription,
        },
      },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const logout = async (req, res, next) => {
  try {
    await userLogoutSchema.validateAsync(req.body);
    const { id } = req.user;
    await usersService.update(id, { token: null });
    return res.json({
      status: "No content",
      code: 204,
      message: "Logout successful. Token removed",
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { body } = req;
    const results = await usersService.update(id, body);
    return res.json({
      status: "success",
      code: 200,
      data: {
        user: results,
      },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const updateSubscription = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { subscription } = req.body;
    await userUpdateSubSchema.validateAsync(req.body);
    const results = await usersService.update(id, {
      subscription: subscription,
    });
    return res.json({
      status: "success",
      code: 200,
      data: {
        user: results,
      },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.user;
    await usersService.remove(id);
    return res.json({
      status: "success",
      code: 200,
      data: {
        user: id,
      },
      message: "User removed",
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const usersController = {
  getAll,
  getById,
  getCurrent,
  register,
  login,
  logout,
  update,
  updateSubscription,
  remove,
};

export default usersController;
