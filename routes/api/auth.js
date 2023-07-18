const express = require("express");
const {
  register,
  login,
  getCurrent,
  logout,
  subscriptionUpdate,
} = require("../../controllers/auth");
const validateBody = require("../../midlewares/validateBody");
const authentificate = require("../../midlewares/authentificate");
const { schemas } = require("../../models/user");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), register);
router.post("/login", validateBody(schemas.loginSchema), login);
router.get("/users/current", authentificate, getCurrent);
router.post("/logout", authentificate, logout);
router.patch(
  "/users",
  authentificate,
  validateBody(schemas.subscriptionUpdateSchema),
  subscriptionUpdate
);
module.exports = router;
