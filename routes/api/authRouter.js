const express = require("express");

const router = express.Router();
const {
  createUserValidasionSchema,
  loginValidationSchema,
} = require("../../decorator/authValidationSchema");
const { singup, login } = require("../../controlers/authControler");

const validateBody = require("../../decorator/validateBody");

const jsonParser = express.json();

router.post(
  "/singup",
  jsonParser,
  validateBody(createUserValidasionSchema),
  singup
);
router.post("/login", validateBody(loginValidationSchema));
router.post("/logout");

module.exports = router;
