const express = require("express");
const {
  registrationUser,
  loginUser,
  logoutUser,
  currentUser,
} = require("../../controllers/users");
const { validateBody } = require("../../middlewares/validation");
const {
  registerSchema,
} = require("../../utils/validation/userValidationSchemas");
const { verefyToken } = require("../../middlewares/verefyToken");

const router = express.Router();

router.post("/register", validateBody(registerSchema), registrationUser);
router.post("/login", validateBody(registerSchema), loginUser);
router.post("/logout", verefyToken, logoutUser);
router.get("/current", verefyToken, currentUser);

module.exports = router;
