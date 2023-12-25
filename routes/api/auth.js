// routes/auth.js

const express = require("express");
const { registerValid } = require("../../middlewares/authValidation");
const authCtrl = require("../../controllers/auth");

const router = express.Router();

router.post("/register", registerValid, async (req, res, next) => {
  try {
    await authCtrl.register(req, res);
  } catch (error) {
    next(error); // Передаємо помилку обробнику помилок Express
  }
});

module.exports = router;
