const service = require("../service");
const { userSchema } = require("../helpers/joiSchema.js");
const jwt = require("jsonwebtoken");

const gravatar = require("gravatar");
const Jimp = require("jimp");
const fs = require("fs");

require("dotenv").config();
const secret = process.env.SECRET;
const User = require("../service/schemas/user.js");
const { nanoid} = require("nanoid");
const { sendMail } = require("../helpers/sendgrid");

const currentUser = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const user = await service.getUserById(_id);
    if (user) {
      res.status(200).json({
        status: "success",
        code: 200,
        message: "OK",
        data: {
          email: user.email,
          subscription: user.subscription,
        },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `user not found`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const logoutUser = async (req, res, next) => {
  const { _id } = req.user;
  try {
    await service.updateUserJWT(_id, null);
    return res.status(204).json({
      status: "No Content",
      code: 204,
      message: "User have been logout",
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const results = await service.getAllUsers();
    res.status(200).json({
      status: "success",
      code: 200,
      message: "OK",
      data: {
        users: results,
      },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const updateUserSub = async (req, res, next) => {
  const { subscription } = req.body;
  const { _id } = req.user;
  const { error } = userSchema.validate({ subscription });
  if (!error) {
    try {
      const result = await service.updateUserSubscription(_id, subscription);
      if (result) {
        res.status(200).json({
          status: "success",
          code: 200,
          message: "OK",
          data: {
            // email,
            subscription,
          },
        });
      } else {
        res.status(404).json({
          status: "error",
          code: 404,
          message: `user not found`,
          data: "Not Found",
        });
      }
    } catch (e) {
      console.error(e);
      next(e);
    }
  } else {
    res.status(400).json({
      status: "error",
      code: 403,
      message: error.details[0].message,
      data: "Bad Request",
    });
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await service.getUser(email);
  const { error } = userSchema.validate({ email, password });

  if (!error) {
    if (!user || !user.validPassword(password)) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Incorrect login or password",
        data: "Unauthorized",
      });
    } else if (!user.isVerified) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Please verify Your account first",
        data: "Unauthorized",
      });
    }


    const payload = {
      id: user.id,
      email: user.email,
    };

    const token = jwt.sign(payload, secret, { expiresIn: "2h" });
    await User.findByIdAndUpdate(user.id, { token });
    res.status(200).json({
      status: "success",
      code: 200,
      message: "OK",
      data: {
        token,
        user: {
          email,
          subscription: user.subscription,
        },
      },
    });
  } else {
    res.status(400).json({
      status: "error",
      code: 400,
      message: error.details[0].message,
      data: "Bad Request",
    });
  }
};

const registerUser = async (req, res, next) => {
  const { email, password } = req.body;
  const { error } = userSchema.validate({ email, password });
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();
  if (!error) {
    const user = await service.getUser(email);
    if (user) {
      return res.status(409).json({
        status: "error",
        code: 409,
        message: "Email is already in use",
        data: "Conflict",
      });
    }
    try {
      const newUser = new User({ email, avatarURL, verificationToken });
      newUser.setPassword(password);
      await newUser.save();
      sendMail(email, verificationToken);
      res.status(201).json({
        status: "success",
        code: 201,
        message: "Created",
        data: {
          user: {
            email,
            subscription: "starter",
          },
        },
      });
    } catch (e) {
      console.error(e);
      next(e);
    }
  } else {
    res.status(400).json({
      status: "error",
      code: 400,
      message: error.details[0].message,
      data: "Bad Request",
    });
  }
};

const updateAvatar = async (req, res, next) => {
  const { _id } = req.user;
  const avatarURL = `./avatars/av_${_id}.png`;
  await Jimp.read(`tmp/${req.file.filename}`)
    .then((avatar) => {
      return avatar
        .resize(250, 250) // resize
        .write(`public/avatars/av_${_id}.png`); // save
    })
    .catch((err) => {
      console.error(err);
    });
  try {
    const result = await service.updateUserAvatar(_id, avatarURL);
    if (result) {
      fs.unlink(req.file.path, (err) => {
        console.error(err);
      });
      res.status(200).json({
        status: "success",
        code: 200,
        message: "OK",
        data: {
          avatarURL,
        },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `user not found`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const verifyUser = async (req, res, next) => {
  const { verificationToken } = req.params;
  try {
    const result = await service.updateVerificationToken(verificationToken);
    if (result) {
      res.status(200).json({
        status: "success",
        code: 200,
        message: "Verification succesful",
        data: "OK",
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `User not found`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const resendVerificationMail = async (req, res, next) => {
  const { email } = req.body;
  const { error } = userSchema.validate({ email });
  if (!error) {
    try {
      const user = await service.getUser(email);
      if (!user) {
        res.status(404).json({
          status: "error",
          code: 404,
          message: `User not found`,
          data: "Not Found",
        });
      } else if (!user.isVerified) {
        sendMail(email, user.verificationToken);
        res.status(200).json({
          status: "success",
          code: 200,
          message: "Verification email sent",
          data: "OK",
        });
      } else {
        res.status(400).json({
          status: "error",
          code: 400,
          message: "Verification has already been passed",
          data: "Bad request",
        });
      }
    } catch (e) {
      console.error(e);
      next(e);
    }
  } else {
    res.status(400).json({
      status: "error",
      code: 400,
      message: error.details[0].message,
      data: "Bad Request",
    });
  }
};

module.exports = {
  registerUser,
  getAllUsers,
  loginUser,
  logoutUser,
  currentUser,
  updateUserSub,
  updateAvatar,
  verifyUser,
  resendVerificationMail,
};
