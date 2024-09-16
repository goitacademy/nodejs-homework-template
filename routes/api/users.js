import express from "express";
import userController from "../../controllers/user/index.js";
import schemas from "../../schemas/index.js";
import {
  authenticate,
  validateBody,
  isEmptyBody,
} from "../../middlewares/index.js";

const usersRouter = express.Router();

usersRouter.post(
  "/register",
  isEmptyBody,
  validateBody(schemas.joiUserSchemas),
  userController.register
);

usersRouter.post(
  "/login",
  validateBody(schemas.joiUserSchemas),
  userController.login
);

usersRouter.get("/current", authenticate, userController.getCurrent);

usersRouter.patch(
  "/subscription",
  authenticate,
  isEmptyBody,
  validateBody(schemas.joiUpdateSubscription),
  userController.updateSubscription
);

usersRouter.post(
  "/logout",
  authenticate,

  userController.logout
);

export default usersRouter;
