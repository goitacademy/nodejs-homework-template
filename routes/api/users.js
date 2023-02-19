const express = require("express");
const { validation, ctrlWrapper } = require("../../middlewares");
const usersSchema = require("../../schemas/users");
const registerUserController = require("../../controller/users/registerUserController");
const loginUserController = require("../../controller/users/loginUserController");
const { authMiddleware } = require("../../middlewares/authMiddleware");
const {
  logoutUserController,
} = require("../../controller/users/logoutUserController");
const {
  currentUserController,
} = require("../../controller/users/currentUserController");

const router = express.Router();

router.post(
  "/signup",
  validation(usersSchema),
  ctrlWrapper(registerUserController)
);

router.post(
  "/login",
  validation(usersSchema),
  ctrlWrapper(loginUserController)
);
router.use(authMiddleware);
router.get("/logout", ctrlWrapper(logoutUserController));
router.get("/current", ctrlWrapper(currentUserController));
module.exports = router;
