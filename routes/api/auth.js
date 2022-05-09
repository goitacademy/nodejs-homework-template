const express = require("express");
const { User, schemas } = require("../../models/user");
const { createError } = require("../../helpers/");
const router = express.Router();

router.post("/register", async (req, res, next) => {
  console.log("ffffffffffffffffffffffffff");
  try {
    const { error } = schemas.register.validate(req.body);
    if (error) {
      throw createError(400, "Ошибка от Joi или другой библиотеки  валидации");
    }
    const { email, password } = req.body;
    const result = await User.findOne({ email });
    if (result) {
      throw createError(409, "Email in use");
    }
    const user = await User.create({ email, password });
    res.status(201).json({
      user: { email },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
