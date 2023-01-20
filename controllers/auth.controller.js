const { User } = require("../models/user");
const createError = require("http-errors");
// const {
//   DuplicateKeyError,
//   MissedUserError,
//   WrongPasswordError,
// } = require("../helpers/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

async function register(req, res, next) {
  const { email, password } = req.body;
  //   console.log(`email: ${email}, password: ${password}`);
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const savedUser = await User.create({
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      data: { user: { email, id: savedUser._id } }, // TODO: check data
    });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error")) {
      console.log("error while saving user", error.message, error.name);
      //   throw new DuplicateKeyError(`User with email <${email}> already exists!`);
      throw createError.Conflict(`User with email <${email}> already exists!`);
    }
    throw error;
  }
}

async function login(req, res, next) {
  console.log("function login...");
  const { email, password } = req.body;
  const storedUser = await User.findOne({ email });
  if (!storedUser) {
    // throw new MissedUserError("email is not valid"); // "email or password is not valid"
    throw createError.Conflict("email is not valid");
  }

  const isPasswordValid = await bcrypt.compare(password, storedUser.password);
  if (!isPasswordValid) {
    // throw new WrongPasswordError("password is not valid");
    // return next(createError(409, "password is not valid!"));
    // return next(createError.Conflict("password is not valid")); // "email or password is not valid"
    throw createError.Conflict("password is not valid"); // "email or password is not valid"
  }
  const payload = { id: storedUser._id };
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: "1h", // "1m", "1s",
  });
  return res.json({
    data: {
      token,
    },
  });
}

module.exports = {
  register,
  login,
};
