import {
  listUsers,
  getUserById,
  loginUser,
  updateAvatar,
} from "../models/users.js";
import jwt from "jsonwebtoken";
import passport from "passport";
import User from "../service/schemas/users.js";
import "dotenv/config";
import gravatar from "gravatar";
import Jimp from "jimp";
import path from "path";
import { uploadImage } from "../config/config-multer.js";

const secret = process.env.JWT_SECRET;

export const get = async (req, res, next) => {
  try {
    const contacts = await listUsers();
    res.json({
      message: "response ok",
      status: "success",
      code: 200,
      data: contacts,
    });
  } catch (err) {
    console.error("Error while reading contacts");
    next(err);
  }
};

export const login = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res
      .status(400)
      .json("Error! Missing fields! Empty request is not allowed");
  }

  try {
    const user = await loginUser(body);

    if (!user) {
      return res.status(400).json(`Error! Email or password is wrong!`);
    }

    const payload = {
      id: user.id,
      username: user.email,
    };

    const token = jwt.sign(payload, secret, { expiresIn: "1h" });

    user.token = token;
    await user.save();

    const { email, subscription } = user;

    res.status(200).json({
      status: "success",
      code: 200,
      token: token,
      user: { email, subscription },
    });
  } catch (err) {
    res.status(500).json(`An error occurred while adding the user: ${err}`);
  }
};

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const user = await getUserById({ email });

  if (user) {
    return res.status(409).json({
      status: "error",
      code: 409,
      message: "Email is already in use",
      data: "Conflict",
    });
  }

  const avatarURL = gravatar.url(email, { s: "200" }, true);
  console.log(avatarURL);
  try {
    const newUser = new User({ username, email, avatarURL });
    newUser.setPassword(password);
    await newUser.save();
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        message: "User created successfully",
        avatarURL,
      },
    });
  } catch (err) {
    next(err);
  }
};
export const list = async (req, res) => {
  const { username } = req.user;
  res.json({
    status: "success",
    code: 200,
    data: {
      message: `Authorization was successful: ${username}`,
    },
  });
};

export const logout = async (req, res) => {
  const id = req.user.id;
  try {
    const user = await getUserById(id);
    if (!user) {
      return res.status(401).json({
        status: "Unauthorized",
        code: 401,
        message: "not authorized",
      });
    }

    user.token = null;
    await user.save();
    res.status(204).json({
      status: "success",
      code: 200,
      data: {
        message: "Logout was successful",
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "An error occurred while logging out",
    });
  }
};

export const auth = async (req, res, next) => {
  try {
    await passport.authenticate(
      "jwt",
      { session: false },
      async (err, user) => {
        if (!user || err) {
          return res.status(401).json({
            status: "error",
            code: 401,
            message: "Unauthorized",
            data: "Unauthorized",
          });
        }

        const authHeader = req.headers.authorization;
        const token = authHeader?.split(" ")[1];

        const allUsers = await listUsers();
        const isTokenExists = allUsers.some((user) => user.token === token);
        if (!isTokenExists) {
          return res.status(401).json({
            status: "error",
            code: 401,
            message: "Token is not authorized",
            data: "Token not authorized",
          });
        }

        req.user = user;
        next();
      }
    )(req, res, next);
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "An error occurred during authentication.",
    });
  }
};

export const update = async (req, res) => {
  const { id: userId } = req.user;
  const { body } = req;
  const { subscription } = body;

  if (!("subscription" in body) || Object.keys(body).length === 0) {
    return res.status(400).json("Error! Missing field subscription!");
  }

  try {
    const updatedStatus = await patchUser(subscription, userId);
    if (updatedStatus === 400) {
      return res.status(400).json("Error! Invalid subscription type!");
    }
    return res.json({
      status: "success",
      code: 200,
      data: { updatedStatus },
    });
  } catch (err) {
    res
      .status(500)
      .json(`An error occurred while updating the contact: ${err}`);
  }
};
export const updateUserAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json("Error! Missing file!");
    }

    const { id: userId } = req.user;

    const newAvatarPath = await updateAvatar(req.file.path, userId);

    return res.status(200).json({
      status: "success",
      code: 200,
      avatarURL: newAvatarPath,
    });
  } catch (error) {
    console.error("An error occurred while updating avatar: ", error);
    res
      .status(500)
      .json(`An error occurred while updating the avatar: ${error}`);
  }
};
