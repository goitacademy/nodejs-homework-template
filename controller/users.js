import {
  listUsers,
  getUserById,
  loginUser,
  updateAvatar,
  getUserByVerificationToken,
} from "../models/users.js";
import jwt from "jsonwebtoken";
import User from "../service/schemas/users.js";
import "dotenv/config";
import gravatar from "gravatar";
import fs from "fs/promises";
import { nanoid } from "nanoid";
import { transporter, emailOptions } from "../config/config-nodemailer.js";
import Joi from "joi";

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
    } else if (!user.isVerified)
      return res.status(400).json(`Error! Email is not verified!`);

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
  const { email, password } = req.body;
  const user = await User.findOne({ email });

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

    const url = gravatar.url(
      email,
      {
        s: "250",
      },
      true
    );

    newUser.avatarURL = url;
    newUser.verificationToken = nanoid();

    await newUser.save();
    const link = `/users/verify/${newUser.verificationToken}`;
    transporter
      .sendMail(emailOptions(email, link))
      .then((info) => console.log(info))
      .catch((err) => console.log(err));
    const avatarURL = url;
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
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Token is not authorized",
      });
    }
    req.token = authHeader.split(" ")[1];

    const userDetailsFromToken = jwt.verify(req.token, secret);
    const user = await User.findById(userDetailsFromToken.id);
    if (!user || !user.token || user.token !== req.token) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Token is not authorized",
      });
    }
    req.user = user;
    next();
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

    const newAvatarPath = await updateAvatar(
      req.file.path,
      userId,
      req.file.originalname
    );

    await fs.unlink(`tmp/${req.file.originalname}`);
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
export const emailVerification = async (req, res) => {
  const { verificationToken } = req.params;
  try {
    const user = await getUserByVerificationToken(verificationToken);
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    user.verificationToken = null;
    user.isVerified = true;
    await user.save();
    return res.status(200).json({ message: "Verification successful" });
  } catch (err) {
    console.log(err);
  }
};
export const reverification = async (req, res) => {
  const { email } = req.body;
  // const emailSchema = Joi.string().email().required();
  try {
    // const { error } = Joi.validate(email, emailSchema);
    // if (error) {
    //   return res.status(400).json({
    //     message: "Invalid email format",
    //   });
    // }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    if (user.isVerified) {
      return res.status(400).json({
        message: "Verification has already been passed",
      });
    }

    const link = `/users/verify/${user.verificationToken}`;

    transporter
      .sendMail(emailOptions(email, link))
      .then((info) => console.log(info))
      .catch((err) => console.log(err));

    return res.status(200).json({
      message: "Verification email sent",
    });
  } catch (error) {
    console.error("Error resending verification email:", error);
    return res.status(500).json({
      message: "An error occurred while resending the verification email",
    });
  }
};
