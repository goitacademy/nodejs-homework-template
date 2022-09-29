const { Router } = require("express");

const router = Router();

const { signupSchema } = require("../../schemas");
const { validateSchema } = require("../../helpers");
const User = require("../../models/userModel");
const { createError } = require("../../helpers");

router.post("/signup", async (req, res, next) => {
  try {
    validateSchema(signupSchema, req.body);

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      throw createError(409, "Email already exist");
    }

    const newUser = await User.create(req.body);

    res.send("signup");

    return newUser;
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    res.send("login");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
