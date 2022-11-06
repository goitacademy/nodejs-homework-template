const jwt = require("jsonwebtoken");
require("dotenv").config();

const usersService = require("../services/users");

const registerUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await usersService.findUserByEmail(email);

    if (user) {
      return res.status(409).json({ message: "User already exists" });
    }

    const newUser = await usersService.createNewUser(req.body);

    res.status(201).json({
      message: `User created`,
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (err) {
    next(err);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await usersService.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    const isPasswordCorrect = await user.validatePassword(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    const payload = {
      id: user._id,
      name: user.name,
      email: user.email,
      subscription: user.subscription,
    };

    const SECRET = process.env.SECRET_KEY;
    const token = jwt.sign(payload, SECRET, { expiresIn: "1h" });
    await usersService.updateUserToken(user._id, token);

    res.status(200).json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
      message: "User logged in successfully",
    });
  } catch (err) {
    next(err);
  }
};

const logoutUser = async (req, res, next) => {
  try {
    const { _id: id} = req.user;
    await usersService.updateUserToken(id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

const authenticateUser = async (req, res, next) => {};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  authenticateUser,
};
