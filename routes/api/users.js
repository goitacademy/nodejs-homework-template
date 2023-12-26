const { Router } = require("express");
const router = Router();
const validateBody = require("../../middlewares/validateBody");
const {
  registerSchema,
  loginSchema,
  updateSubsSchema,
} = require("../../schemas/usersJoiSchema");
const authenticate = require("../../middlewares/authenticate");
const UserController = require("../../controllers/UserController");

router.post(
  "/register",
  validateBody(registerSchema),
  UserController.createUser
);

module.exports = router;
