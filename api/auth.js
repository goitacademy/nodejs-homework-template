const express = require("express");

const { auth: ctrl } = require("../controllers");

const router = express.Router();

const { validation } = require("../middlewares");
const {
  user: { joiSchema },
} = require("../models/schemas");

router.post("/signup", validation(joiSchema), ctrl.signup);
// router.post("/register", ctrl.register);

// router.post("/signin", ctrl.signin);
// router.post("/login", ctrl.login);

// router.get("/logout", ctrl.logout);

// =============================

module.exports = router;
