const { Router } = require("express");
const { userValidationMiddleware } = require("./user.validators");
const usersController = require("./users.controller");

const usersRouter = Router();

usersRouter.post(
  "/signup",
  userValidationMiddleware,
  usersController.signUpHandler
);

// usersRouter.get("/", usersController.getAllUsersHandler);
// usersRouter.get("/:id", usersController.getSingleUserHandler);
// usersRouter.put(
//   "/:id",
//   userValidationMiddleware,
//   usersController.replaceUserHandler
// );
// usersRouter.delete("/:id", usersController.deleteUserHandler);
// usersRouter.patch("/:id/favorite", usersController.updateUserStatus);

module.exports = {
  usersRouter,
};
