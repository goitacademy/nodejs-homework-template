const express = require("express");
const ctrl = require("../../controllers/auth");
const {
  validateBody,
//   validateUpdateBody,
//   validateFavorite,
//   isValidId,
} = require("../../middlewares");

const { schemas } = require("../../models/userModel");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);
router.post("/login", validateBody(schemas.registerSchema), ctrl.login);

module.exports = router
