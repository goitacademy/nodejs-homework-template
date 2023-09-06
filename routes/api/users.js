const express = require("express");
const {
  registrationUser,
  loginUser,
  logoutUser,
  currentUser,
  subscriptionUser,
} = require("../../controllers/users");
const { validateBody } = require("../../middlewares/validation");
const {
  registerSchema,
  subscriptionSchema,
} = require("../../utils/validation/userValidationSchemas");
const { verefyToken } = require("../../middlewares/verefyToken");

const router = express.Router();

router.patch(
  "/",
  verefyToken,
  validateBody(subscriptionSchema),
  subscriptionUser
);
router.post("/register", validateBody(registerSchema), registrationUser);
router.post("/login", validateBody(registerSchema), loginUser);
router.post("/logout", verefyToken, logoutUser);
router.get("/current", verefyToken, currentUser);

module.exports = router;
