const express = require("express");
const auth = require("../middleware/authMiddleware");
const router = express.Router();
const jsonParser = express.json();
const AunthController = require("../controllers/authController");
const validateBody = require("../middleware/validateBody");
const { schemas } = require("../models/user");

router.post(
  "/register",
  jsonParser,
  validateBody(schemas.RegisterSchema),
  AunthController.register
);
router.post(
  "/login",
  jsonParser,
  validateBody(schemas.LoginSchema),
  AunthController.login
);
router.post("/logout", auth, AunthController.logout);
router.get("/current", auth, AunthController.current);

module.exports = router;
