const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotevn = require("dotenv");
dotevn.config();

const { User } = require("../models/users");
const { schema } = require("../utils/validation/userSchemaValidation");

const { HttpError } = require("../helpers");

const { SECRET_KEY } = process.env;

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      throw new HttpError(409, "User with this email already exists");
    }

    const { error } = schema.addRegisterSchema.validate(req.body);
    if (error) {
      throw new HttpError(400, "Invalid request");
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ ...req.body, password: hashPassword });
    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: "starter",
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new HttpError(401, "Email or password is wrong");
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw new HttpError(401, "Email or password is wrong");
    }

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

    await User.findByIdAndUpdate(user._id, { token });

    res.json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};
const current = async (req, res, next) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};

const logout = async (req, res, next) => {
  const { _id } = req.user;

  try {
    const user = await User.findByIdAndUpdate(_id, { token: "" });

    if (!user) {
      throw new HttpError(401, "Not authorized");
    }

    res.status(204).json({ message: "Logout success" });
    res.end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  current,
  logout,
};
