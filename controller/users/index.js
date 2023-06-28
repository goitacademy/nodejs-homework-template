const Joi = require("joi");
const jwt = require("jsonwebtoken");

const User = require("../../service/schemas/user");

require("dotenv").config();
const secret = process.env.SECRET;

const UserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(5).required(),
});

const UserSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const signup = async (req, res, next) => {
  const { email, password } = req.body;
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
          message: "Email in use",
          data: "Conflict",
        });
      }
      try {
        const newUser = new User({ email });
        newUser.setPassword(password);
        await newUser.save();
        res.status(201).json({
          status: "created",
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
        message: error.message,
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

      const payload = {
        id: user.id,
      };

      const token = jwt.sign(payload, secret, { expiresIn: "1h" });

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
  await user.save();

  return res.status(204).send();
};

const getCurrentUser = async (req, res, next) => {
  try {
    const user = req.user;
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
  getCurrentUser,
  signup,
  login,
  logout,
  changeSubscription,
};
