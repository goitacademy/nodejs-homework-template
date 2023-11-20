const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const BASE_URL = process.env.DATABASE_URI;

mongoose
  .connect(BASE_URL)
  .then(() => console.log("Database connection successful"))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

// Register User
async function register(req, res, next) {
  const { email, password, subscription } = req.body;
  console.log("Received data:", req.body);
  try {
    const user = await User.findOne({ email }).exec();

    if (user !== null) {
      console.log("User already exists");
      return res.status(409).send({ message: "Email in use" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const addUser = await User.create({
      email,
      password: passwordHash,
      subscription,
    });

    console.log("User registered successfully:", addUser);

    res
      .status(201)
      .send({ email: addUser.email, subscription: addUser.subscription });
  } catch (error) {
    console.error("Error during registration:", error);
    next(error);
  }
}

// Login User
async function login(req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).exec();

    if (user === null) {
      console.log("User not found");
      return res.status(401).send({ message: "Email or password is wrong" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch === false) {
      console.log("Password doesn't match");
      return res.status(401).send({ message: "Email or password is wrong" });
    }

    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    await User.findByIdAndUpdate(user._id, { token }).exec();

    console.log("User logged in successfully");
    res.send({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    next(error);
  }
}

// Log out user
async function logout(req, res, next) {
  try {
    await User.findByIdAndUpdate(req.user._id, { token: null }).exec();

    if (!req.user._id) {
      res.status(404).send({ message: "Not authorized" });
    }

    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

// Current user
async function current(req, res, next){

  try {
    const user = await User.findOne().exec();

    if(!user){
      return res.status(401).send({message: "Not authorized"})
    }

    res.status(200).send({ email: user.email, subscription: user.subscription})
  } catch (error) {
    console.log(error)
    next(error)
  }
}
module.exports = {
  register,
  login,
  logout,
  current
}