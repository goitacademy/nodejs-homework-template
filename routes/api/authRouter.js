const express = require("express");
const authControler = require("../../controlers/authControler");
const router = express.Router();
const {
  createUserValidasionSchema,
  loginValidationSchema,
} = require("../../decorator/authValidationSchema");

const validateBody = require("../../decorator/validateBody");

const jsonParser = express.json();

router.post(
  "/register",
  jsonParser,
  validateBody(createUserValidasionSchema),
  authControler.singup
);
router.post("/login", validateBody(loginValidationSchema));
router.post("/logout");

module.exports = router;
