import express from "express";
import { ausValidate } from "../../middleware/validation/validation.js";
import authenticate from "../../middleware/validation/authenticate.js";
import ausController from "../../controllers/user-controller.js";

const authRouter = express.Router();

authRouter.post("/register", ausValidate, ausController.userReg);

authRouter.post("/login", ausValidate, ausController.userLog);

authRouter.post("/logout", authenticate, ausController.logOut);

authRouter.get("/current", authenticate, ausController.getCurrent);

authRouter.patch("/:subscription", authenticate, ausController.changeSubscript);

export default authRouter;
