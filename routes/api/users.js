const routers = require("express").Router();

const {
  registerUserController,
  loginUserController,
  logoutUserController,
  refreshUserController,
} = require("../../controllers/users");
const { asyncWrapper } = require("../../helpers/apiHelpers");

const auth = require("../../middlewares/auth");
const {
  authUserValidation,
} = require("../../middlewares/validationMiddleware");

routers.post(
  "/signup",
  authUserValidation,
  asyncWrapper(registerUserController)
);

routers.post("/login", authUserValidation, asyncWrapper(loginUserController));

routers.post("/logout", auth, asyncWrapper(logoutUserController));

routers.get("/current", auth, asyncWrapper(refreshUserController));

module.exports = routers;
