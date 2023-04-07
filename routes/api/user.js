const express = require("express");
const loginHandler = require("../../auth/loginHandler");
const auth = require("../../auth/auth");
const userControllers = require("../../controllers/users.js");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

require("dotenv").config();

const router = express.Router();

const { User, userValidationSchema } = require("../../models/user");

router.post("/signup", async (req, res, next) => {
  const { error } = userValidationSchema.validate(req.body);
  const { email, password } = req.body;
  if (error) {
    return res.status(409).json(error.details[0].message);
  }

  const user = await User.findOne({ email });

  if (user) {
    return res.status(409).json({
      status: "error",
      code: 409,
      message: "Email id already in use",
      data: "Conflict",
    });
  }

  try {
    const user = await userControllers.createUser(email, password);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).send("Something went wrong");
  }
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "Incorrect login or password",
      data: "Bad request",
    });
  }

  try {
    const token = await loginHandler(email, password);

    return res.status(200).send(token);
  } catch (err) {
    return res.status(401).send(err);
  }
});

router.get("/logout", auth, async (req, res) => {
  try {
    const { token } = req.headers.authorization;
    const verify = jwt.verify(token, jwtSecret);
    const user = await userControllers.logout(verify);
    res.status(204).send("Logout success", user);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

router.get("/current", auth, async (req, res) => {
  try {
    const { token } = req.user;
    const user = await userControllers.getUserByToken(token);

    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
