import express from "express";

import authCtrl from "../../controllers/auth-controllers.js";

import usersSchemas from "../../schemas/users-schemas.js";

import { upload, validateBody, authenticate } from "../../middlewares/index.js";

const authRouter = express.Router();

// для декількох файлів завантаження в декількох полях:
// upload.fields([{name: "avatar", maxCount: 5}])

// для декількох файлів завантаження в одному полі:
// upload.array("avatar", 5)

authRouter.post("/signup", validateBody(usersSchemas.userSignupSchema), authCtrl.signup);

authRouter.post("/signin", validateBody(usersSchemas.userSigninSchema), authCtrl.signin);

authRouter.get("/current", authenticate, authCtrl.getCurrent);

authRouter.post("/signout", authenticate, authCtrl.signout);

authRouter.patch("/avatars", authenticate, upload.single("avatar"), authCtrl.updateAvatar);

export default authRouter;
