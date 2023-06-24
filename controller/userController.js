const path = require("path");
const { User } = require("../models/users");
const { emailValidator } = require("../validators/validators");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET = process.env.SECRET;

const userRegister = async (req, res, next) => {
  const { email, password } = req.body;
  const { error } = await emailValidator(email);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const user = await User.findOne({ email });
  if (user) {
    res.json({
      status: "error",
      code: 409,
      data: "Conflict",
      message: "User already exists!",
    });
  }
  try {
    const newUser = new User({ email });
    newUser.setPassword(password);
    await newUser.save();

    res.json({
      status: "Created",
      code: 201,
      user: {
        email: email,
        subscription: "starter",
      },
    });
  } catch (error) {
    next(error);
  }
};

const logIn = async (req, res, next) => {
  const { email, password } = req.body;

  const { error } = await emailValidator(email);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const user = await User.findOne({ email });
  if (!user || !user.validPassword(password)) {
    return res.json({
      status: "error",
      code: 400,
      data: "Bad request",
      message: "Incorrect login/password",
    });
  }
  const payload = {
    id: user.id,
  };

  const token = jwt.sign(payload, SECRET, { expiresIn: "1h" });
  user.token = token;
  await user.save();

  res.json({
    status: "success",
    code: 200,
    token: token,
    user: {
      email: email,
      subscription: user.subscription,
    },
  });
};

const getUserDetails = async (req, res, next) => {
  try {
    const user = req.user;
    const { email, subscription } = user;
    res.json({
      status: "OK",
      code: 200,
      ResponseBody: {
        email,
        subscription,
      },
    });
  } catch {
    next(error);
  }
};

const logOutUser = async (req, res, next) => {
  try {
    req.user.token = null;

    await req.user.save();
    res.status(204).json();
  } catch {
    next(error);
  }
};

const uploadAvatar = async (req, res, next) => {
  if (!req.file) {
    res.status(400).send("Nie przesłano żadnego pliku.");
  }
  console.log("próbuję");
  const { description } = req.body;
  const { path: temporaryName, originalname } = req.file;
  try {
    console.log(fileName);
  } catch (err) {
    await fs.unlink(temporaryName);
    return next(err);
  }
  res.json({ description, message: "Załadowano obrazek", status: 200 });
};

module.exports = {
  userRegister,
  logIn,
  getUserDetails,
  logOutUser,
  uploadAvatar,
};
