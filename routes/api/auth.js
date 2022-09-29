const { Router } = require("express");

const router = Router();

const { signupSchema } = require("../../schemas");
const { validateSchema } = require("../../helpers");
const User = require("../../models/userModel");

router.post("/signup", async (req, res, next) => {
  try {
    validateSchema(signupSchema, req.body);
    res.send("signup");
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
