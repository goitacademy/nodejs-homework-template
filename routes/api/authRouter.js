const express = require("express");

const router = express.Router();
const {
  createUserValidasionSchema,
  loginValidationSchema,
} = require("../../decorator/authValidationSchema");
const { singup, userLogin } = require("../../controlers/authControler");

const validateBody = require("../../decorator/validateBody");

const jsonParser = express.json();

router.post(
  "/singup",
  jsonParser,
  validateBody(createUserValidasionSchema),
  singup
);
router.post("/login", validateBody(loginValidationSchema), userLogin);
router.post("/logout");

module.exports = router;
