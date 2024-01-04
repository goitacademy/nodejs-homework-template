const express = require("express");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const { userBodySchema, User } = require("../../models/users");
const { authenticate } = require("../../middlewares/authenticate");

const router = express.Router();

router.post("/register", async (req, res, next) => {
  const body = req.body;
  if (Object.keys(body).length === 0) {
    res.status(400).json({ message: "missing fields" });
    return;
  }
  const { error } = userBodySchema.validate(body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return;
  }
  const isExist = await User.exists({
    email: body.email,
  });
  if (isExist) {
    res.status(409).json({ message: "Email in use" });
    return;
  }
  const hashPassword = await bcrypt.hash(body.password, 10);
  const user = await User.create({
    ...body,
    password: hashPassword,
  });
  res
    .status(201)
    .json({ user: { email: user.email, subscription: user.subscription } });
});

router.post("/login", async (req, res, next) => {
  const body = req.body;
  if (Object.keys(body).length === 0) {
    res.status(400).json({ message: "missing fields" });
    return;
  }
  const { error } = userBodySchema.validate(body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return;
  }
  const user = await User.findOne({ email: body.email });

  if (!user) {
    res.status(401).json({ message: "User with such email is't registered!" });
    return;
  }

  const passwordCompare = await bcrypt.compare(body.password, user.password);

  if (!passwordCompare) {
    res.status(401).json({ message: "Email or password is wrong" });
    return;
  }
  const payload = { _id: user._id };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.status(200).json({
    token,
    user: { email: user.email, subscription: user.subscription },
  });
});

router.post("/logout", authenticate, async (req, res, next) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json();
});

router.get("/current", authenticate, async (req, res, next) => {
  const { email, subscription } = req.user;

  res.json({ email, subscription });
});

module.exports = router;
