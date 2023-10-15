import express from "express";
import authController from "../../controllers/auth-controller.js";
import { isEmptyBody } from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";
import { userLoginSchema, userRegisterSchema } from "../../models/User.js";

const userRegisterValidate = validateBody(userRegisterSchema);
const userLoginValidate = validateBody(userLoginSchema);

const router = express.Router();

router.post(
  "/register",
  isEmptyBody,
  userRegisterValidate,
  authController.register
);

router.post("/login", isEmptyBody, userLoginValidate, authController.login);

export default router;
