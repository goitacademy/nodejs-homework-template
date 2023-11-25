const express = require("express");
const controllers = require("../../controllers/ControllContacts");
const router = express.Router();
const validateBody = require("../../middlewares/validateBody");
const {
  registerValidation,
  loginValidation,
} = require("../../schemas/authSchema");

router.post(
  "/register",
  validateBody(registerValidation),
  controllers.register
);

router.post("/login", validateBody(loginValidation), controllers.login);
router.post("/logout", controllers.logout);
router.get("/current", controllers.current);

module.exports = router;
