import { Router } from "express";
import authSchema from "../../schemas/authSchema.js";
import subscribtionSchema from '../../schemas/subscribtionSchema.js';
import { auth } from "../../midlewares/auth.js";
import { isValidId } from "../../helpers/validateById.js";
import { validateBody } from "../../helpers/validateBody.js";
import { register } from "../../controlers/auth/register.js";
import { login } from "../../controlers/auth/login.js";
import { logout } from "../../controlers/auth/logout.js";
import { getCurrent } from "../../controlers/auth/getCurrent.js";
import { updateSubscription } from "../../controlers/auth/updateSubscription.js";
import { upload } from "../../helpers/upload.js";
import { updateAvatar } from "../../controlers/auth/updateAvatar.js";

const authRouter = Router();

authRouter.post("/register", validateBody(authSchema), register);
authRouter.post("/login", validateBody(authSchema), login);
authRouter.post("/logout", auth, logout);
authRouter.get("/current", auth, validateBody(authSchema), getCurrent);
authRouter.patch('/:id/subscription', auth, isValidId, validateBody(subscribtionSchema), updateSubscription);
authRouter.patch("/avatars", auth, upload.single('avatar'), updateAvatar)

export default authRouter;