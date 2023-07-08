const express = require("express");
const ctrls = require("../../controllers/users");
const { validateBody } = require("../../middleware/index");
const { userValidationSchema } = require("../../models/joiSchemas");

const router = express.Router();

router.post(
  "/register",
  validateBody(userValidationSchema),
  ctrls.registerUser
);

router.post("/login", validateBody(userValidationSchema), ctrls.loginUser);

router.post("/logout", ctrls.logoutUser);

router.get("/current", ctrls.currentUser);

module.exports = router;
