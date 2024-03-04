const express = require("express");
const router = express.Router();
const { User } = require("../models/schema");
const { createToken } = require("../models/token");
const { validateUser } = require("../models/validation");

router.get("/current", async (req, res) => {
  const { id, email } = req.user;

  try {
    res.json({
      status: "success",
      code: 200,
      data: { id, email },
      message: "User data",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "Bad Request",
    });
  }
});

router.post("/login", async (req, res) => {
  const body = req.body;
  const { email, password } = body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({
      status: "error",
      code: 400,
      message: "User with this email does not exist",
    });
  }
  if (!user.validPassword(password)) {
    return res.json({
      status: "error",
      code: 401,
      message: "Password is wrong",
    });
  }
  const token = createToken(user._id);
  try {
    await User.updateOne({ email }, { token: token });
    res.json({
      status: "success",
      code: 200,
      data: { token },
      message: "User has been logged in",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "Bad Request",
    });
  }
});

router.post("/logout", async (req, res) => {
  const { id, email } = req.user;
  try {
    await User.updateOne({ _id: id }, { token: null });
    res.json({
      status: "success",
      code: 200,
      data: { id, email },
      message: "User is logout",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "Bad Request",
    });
  }
});

router.post("/signup", async (req, res) => {
  const body = req.body;
  const { email, password } = body;
  if (!email && !password) {
    return res.json({
      status: "error",
      code: 404,
      message: "Email or password is empty",
    });
  }
  const validate = validateUser(body);
  if (validate.error) {
    return res.json({
      status: "error",
      code: 400,
      message: validate.error.message,
    });
  }
  const checkUser = await User.findOne({ email }).lean();
  if (checkUser) {
    return res.json({
      status: "error",
      code: 409,
      message: "Email in use",
    });
  }
  try {
    const user = await new User({ email: validate.value.email });
    await user.setPassword(password);
    await user.save();
    res.json({
      status: "success",
      code: 201,
      data: { id: user._id, email: user.email },
      message: "User has been created",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "Bad Request",
    });
  }
});

module.exports = router;
