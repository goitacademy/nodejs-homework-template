const { User } = require("../models/user");
const { Conflict } = require("http-errors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { JWT_SECRET } = process.env;

async function register(req, res, next) {
  const { email, password } = req.body;
  console.log(email, password);

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const newUser = await User.create({ email, password: hashedPassword });

    res.status(201).json({
      data: {
        user: {
          email,
          id: newUser._id,
        },
      },
    });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error")) {
      throw Conflict("Email or password is wrong");
    }
    console.log("Error while saving user", error.message, error.name);
  }
}

async function login(req, res, next) {
  const { email, password } = req.body;

  const storedUser = await User.findOne({
    email,
  });

  if (!storedUser) {
    throw Conflict("Email or password is wrong");
  }

  const isPasswordValid = await bcrypt.compare(password, storedUser.password);

  if (!isPasswordValid) {
    throw Conflict("Password is not valid");
  }

  const payload = { id: storedUser._id };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

  return res.json({
    token,
  });
}

module.exports = {
  register,
  login,
};
