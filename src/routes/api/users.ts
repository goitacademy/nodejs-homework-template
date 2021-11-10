import express from "express";
import { signupUser } from "./../../controller";
import { asyncWrapper } from "../../helpers";
import { signupUserValidation, checkEmailInUsers } from "./../../middlewares";

const router = express.Router();

router.post(
  "/signup",
  asyncWrapper([signupUserValidation, checkEmailInUsers]),
  asyncWrapper([signupUser])
);
router.post("/login", function () {});

export { router };
