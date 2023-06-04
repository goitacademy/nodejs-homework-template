const express = require("express");
const router = express.Router();
const validateBody = require("../../decorators/validateBody");
const newUserSchema = require("../../schemas/users-schemas");
const authenticate = require("../../middlewares/auth");

const {
  register,
  login,
  getCurrent,
  logout,
} = require("../../controllers/users-controllers");

router.post("/register", validateBody(newUserSchema), register);
router.post("/login", validateBody(newUserSchema), login);
router.get("/current", authenticate, getCurrent);
router.post("/logout", authenticate, logout )

module.exports = router;
