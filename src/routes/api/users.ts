import express from "express";
import { signupUser } from "./../../controller";
import { asyncWrapper } from "../../helpers";
import { signupUserValidation } from "./../../middlewares";

const router = express.Router();

router.post(
  "/signup",
  asyncWrapper([signupUserValidation]),
  asyncWrapper([signupUser])
);
router.post("/login", function () {});

export { router };
