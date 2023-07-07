const Joi = require("joi");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs/promises");
const nanoid = require("nanoid");
const gravatar = require("gravatar");
const Jimp = require("jimp");

const User = require("../../service/schemas/user");
const { sendVerificationEmail } = require("../../utils/mailsender");

require("dotenv").config();
const secret = process.env.SECRET;

const UserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(5).required(),
});

const UserSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const validationEmail = Joi.object({
  email: Joi.string().email().required(),
});

const addAvatar = async (req, res, next) => {
  try {
    const { path: temporaryName } = req.file;
    // console.log(path);
    // console.log(temporaryName);
    const extnameTmp = path.extname(temporaryName);
    // console.log(extnameTmp);
    const newAvatar = Date.now().toString() + extnameTmp;
    // console.log(newAvatar);

    const storeImage = path.join(process.cwd(), "public", "avatars", newAvatar);

    try {
      Jimp.read(temporaryName).then((avatar) => {
        return avatar.resize(250, 250).quality(60).write(storeImage);
      });
    } catch (error) {
      await fs.unlink(temporaryName);
      next(error);
    }

    await fs.unlink(temporaryName);

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(401).json({
        status: "Unauthorized",
        code: 401,
        message: "Not authorized",
        data: "Bad request",
      });
    }

    user.avatarURL = `/avatars/${newAvatar}`;
    await user.save();

    res.status(200).json({
      status: "success",
      code: 200,
      data: { avatarURL: user.avatarURL },
    });
  } catch (err) {
    next(err);
  }
};

const signup = async (req, res, next) => {
  const { email, password } = req.body;
  const verificationToken = nanoid.nanoid(8);
  const avatarURL = gravatar.url(
    email,
    { size: 200, rating: "pg", default: "identicon" },
    true
  );
  try {
    const { error } = UserSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: "Bad request",
        code: 400,
        message: error.message,
        data: "Bad request",
      });
    } else {
      const user = await User.findOne({ email });
      if (user) {
        return res.status(409).json({
          status: "error",
          code: 409,
          message: "Email is in use. Try login on this email.",
          data: "Conflict",
        });
      }
      try {
        const newUser = new User({ email, avatarURL, verificationToken });
        newUser.setPassword(password);
        await newUser.save();
        // const { email, subscription } = newUser;
        await sendVerificationEmail(email, verificationToken);
        res.status(201).json({
          status: "Contact created",
          code: 201,
          data: {
            user: {
              email: newUser.email,
              subscription: newUser.subscription,
            },
          },
        });
      } catch (error) {
        next(error);
      }
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};
const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const { error } = UserSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: "Bad request",
        code: 400,
        message: ("No user", error.message),
        data: "Bad request",
      });
    } else {
      const user = await User.findOne({ email });

      if (!user || !user.validPassword(password)) {
        return res.status(401).json({
          status: "Unauthorized",
          code: 401,
          message: "Email or password is wrong",
          data: "Bad request",
        });
      }

      if (user.verify === false) {
        return res.status(401).json({
          status: "Unauthorized",
          code: 401,
          message: "User not verified",
          data: "Bad request",
        });
      }

      const payload = {
        id: user.id,
      };

      const token = jwt.sign(payload, secret, { expiresIn: "1d" });

      user.setToken(token);
      await user.save();

      res.json({
        status: "success",
        code: 200,
        data: {
          token: user.token,
          user: {
            email: user.email,
            subscription: user.subscription,
          },
        },
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const logout = async (req, res, next) => {
  const { _id } = req.user;
  const user = await User.findOne({ _id });

  if (!user) {
    return res.status(401).json({
      status: "Unauthorized",
      code: 401,
      message: "Not authorized",
      data: "Bad request",
    });
  }

  user.setToken(null);
  console.log("Token deleted, user is logout");
  await user.save();

  return res.status(204).send();
};

const verifyUser = async (req, res, next) => {
  const { verificationToken } = req.params;
  // console.log("Verification token: ", verificationToken);
  try {
    const user = await User.findOne({ verificationToken });
    // console.log("verify user: ", user);

    if (!user) {
      return res.status(404).json({
        status: "Not found",
        code: 404,
        message: "User not found",
        data: "Not found",
      });
    }

    user.verificationToken = "null";
    user.verify = true;
    await user.save();

    res.status(200).json({
      status: "Success",
      code: 200,
      message: "Verification successful",
    });
  } catch (error) {
    // cosole.log(error);
    next(error);
  }
};



const getCurrentUser = async (req, res, next) => {
  try {
    const { email, subscription } = req.user;
    // console.log(user);
    res.json({
      status: "success",
      code: 200,
      data: {
        user: {
          email: email,
          subscription: subscription,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const changeSubscription = async (req, res, next) => {
  try {
    const { error } = UserSubscriptionSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: "Bad request",
        code: 400,
        message: error.message,
        data: "Bad request",
      });
    } else {
      const { subscription } = req.body;
      const user = req.user;
      user.setSubscription(subscription);
      await user.save();

      res.json({
        status: "success",
        code: 200,
        data: {
          user: {
            email: user.email,
            subscription: user.subscription,
          },
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addAvatar,
  getCurrentUser,
  signup,
  login,
  logout,
  changeSubscription,
  verifyUser,
  resendVerificationEmail,
};
