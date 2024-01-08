const { signupServicesValidate } = require("../services/userServices");
const userServices = require("../services/userServices");
const User = require("../model/userModel");
const subscription = require("../model/subscription");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
// ======== REGISTRATION =================================

const generateAccessToken = (id) => {
  const payload = { id };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};

exports.registration = async (req, res) => {
  try {
    const error = await validationResult(req);
    if (!error.isEmpty()) res.status(404).json({ msg: "Registration error" });
    const { email, password } = req.body;
    const candidat = await User.findOne({ email });

    if (candidat)
      res.status(404).json({ msg: "you have already have  an account" });
    const hash = bcrypt.hashSync(password, 7);
    // const userRole = await subscription.findOne({ value: "User" });
    const user = new User({
      email,
      password: hash,
      // subscription: [userRole.value],
    });

    await user.save();
    res.status(200).json({ msg: "Are you welcome" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Invalid registration" });
  }
};
// =========login =============
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    console.log("=============user===================");
    console.log(user);
    if (!user) {
      return res.status(400).json({ msg: "login error" });
    }
    const validPassword = bcrypt.compareSync(password, user.password);
    console.log(validPassword);
    console.log("==============validPassword==================");
    if (!validPassword) {
      return res.status(400).json({ msg: "Password not correct" });
    }

    const token = generateAccessToken(user._id);
    return res.json({ token: token });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Invalid login catch" });
  }
};

exports.getUsers = (req, res) => {
  try {
  } catch (error) {}
};
// exports.signup = async (req, res) => {
//   const userExists = await User.exists(req.params.email);
//   if (!userExists) {
//     throw new Error("User already exists");
//     res.status(404).json({ message: "User does not exist" });
//   }
//   try {
//     const { user, token } = await userServices.signupServicesValidate(req.body);
//     res.status(201).json({ msg: "success", user, token });
//   } catch (error) {
//     console.log(error);
//   }
// };

// const { user, token } = await signupServicesValidate(req.body);
// res.status(201).json({ msg: "signup successful" });

// =================================================================
