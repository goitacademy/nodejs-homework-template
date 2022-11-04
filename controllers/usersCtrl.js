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
      data: newUser,
    });
  } catch (err) {
    next(err);
  }
};

const loginUser = async (req, res, next) => {};

const logoutUser = async (req, res, next) => {};

const authenticateUser = async (req, res, next) => {};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  authenticateUser,
};
