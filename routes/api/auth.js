import express from "express";
import authController from "../../controllers/auth-controller.js";

const authRouter = express.Router();

export default authRouter;
import { authenticate, isEmptyBody } from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";
import { userSignupShema, userSigninShema } from "../../models/User.js";

authRouter.post(
  "/register",
  isEmptyBody,
  validateBody(userSignupShema),
  authController.signup
);
// post - для реєстрації

authRouter.post(
  "/login",
  isEmptyBody,
  validateBody(userSigninShema),
  authController.signin
);
// post - для реєстрації)

authRouter.get("/current", authenticate, authController.getCurrent);
authRouter.post("/logout", authenticate, authController.signout);

// 1. Не працює карент коли не валідний токен
// 2. Не парвильний запит, є аус і юзер
// 3. Не має лог аут
// 4. Спробувати додати контакти, коли ти залогінений
