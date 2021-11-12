import express from "express";
import { signupUser, loginUser } from "./../../controller";
import { asyncWrapper } from "../../helpers";
import {
  signupUserValidation,
  checkEmailInUsers,
  checkUserCredentials,
} from "./../../middlewares";

const router = express.Router();

router.post(
  "/signup",
  asyncWrapper([signupUserValidation, checkEmailInUsers]),
  asyncWrapper([signupUser])
);
router.post(
  "/login",
  asyncWrapper([checkUserCredentials]),
  asyncWrapper([loginUser])
);

export { router };
