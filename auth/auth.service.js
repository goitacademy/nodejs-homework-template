const { UserModel } = require("../users/user.model");
// const { Conflict } = require("http-errors");
const bcrypt = require("bcrypt");
const {
  serializeUserResponse,
  serializeLoginResponse,
} = require("./auth.serializers");
const jwt = require("jsonwebtoken");
// const getConfig = require("../config");

exports.authService = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const isExist = await UserModel.findOne({ email });
    if (isExist) {
      res
        .status(409)
        .json({ message: "User with this email is already exist" });
      return;
      //   throw new Conflict("User with this email is already exist");
    }
    const passwordHash = await bcrypt.hash(password, 8);
    const user = await UserModel.create({ email, password: passwordHash });
    res.status(201).json(serializeUserResponse(user));
  } catch (error) {
    res.send(error);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(401).json({ message: "Email or password is wrong" });
      return;
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
      const token = jwt.sign(
        { uid: user.id, permissions: [] },
        process.env.JWT_SECRET,
        {
          expiresIn: "10d",
        }
      );
      const userResponse = await UserModel.findByIdAndUpdate(
        user._id,
        {
          token: token,
        },
        { new: true }
      );
      res.status(200).json(serializeLoginResponse(userResponse, token));
    }

    // return { user, token };
  } catch (error) {
    res.json(error.message);
  }
};

exports.logoutUser = async (req, res, next) => {
  try {
    const user = await UserModel.findByIdAndUpdate(
      req.user.id,
      {
        token: null,
      },
      { new: true }
    );
    if (!user) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }
    res.status(204).json("");
  } catch (error) {
    res.json(error.message);
  }
};

// currentUser

exports.currentUser = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ token: req.user.token });
    if (!user) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }
    res.status(200).json(serializeUserResponse(user));
  } catch (error) {
    res.json(error.message);
  }
};
