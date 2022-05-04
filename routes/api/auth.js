const express = require("express");
const bcrypt = require("bcryptjs");

const { createError } = require("../../helpers");

const { User, schemas } = require("../../models/user");

const router = express.Router();

router.post("/singup", async (req, res, next) => {
  try {
    const { error } = schemas.singup.validate(req.body);
    if (error) {
      throw createError(400, "Email or password invalid");
    }
    const { email, password } = req.body;
    const result = await User.findOne({ email });
    if (result) {
      throw createError(409, "Email already exist ");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    await User.create({ email, password: hashPassword });
    res.status(201).json({
      user: {
        email,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { error } = schemas.login.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw createError(401, "Email or password is wrong");
    }
    const passwordCompare = await bcrypt.compare(password, user.passwords);
    if (!passwordCompare) {
      throw createError(401, "Email or password is wrong");
    }
    const token = "forexample";
    res.json({ token, user: { email } });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
