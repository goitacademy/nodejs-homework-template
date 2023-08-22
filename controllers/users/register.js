const asyncHandler = require("express-async-handler");
const { userValidator } = require("../../utils/validation/validator");
const userModel = require("../../models/userModel");
const User = require("../../models/userModel");

const register = asyncHandler(async (req, res) => {
  const { error } = userValidator(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  const { email, password, subscription } = req.body;
  const user = await userModel.getUser({ email });
  if (user) {
    return res.status(409).json({
      status: "error",
      code: 409,
      message: "Email is already in use",
      data: "Conflict",
    });
  }

  const newUser = new User({
    email,
    password,
    subscription,
  });
  newUser.setPassword(password);
  await newUser.save();
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      message: "Registration successful",
    },
  });  
});

module.exports = { register };
