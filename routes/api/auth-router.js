import express from "express";
import { ausValidate } from "../../middleware/validation/validation.js";
import authenticate from "../../middleware/validation/authenticate.js";
import ausController from "../../controllers/user-controller.js";
import { upload } from "../../middleware/validation/upload.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  upload.single("avatar"),
  ausValidate,
  ausController.userReg
);

authRouter.post("/login", ausValidate, ausController.userLog);

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ausController.userChangeAvatar
);

authRouter.post("/logout", authenticate, ausController.logOut);

authRouter.get("/current", authenticate, ausController.getCurrent);

authRouter.patch(
  "/subscription/:type",
  authenticate,
  ausController.changeSubscript
);

export default authRouter;
