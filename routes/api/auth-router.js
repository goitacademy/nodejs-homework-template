import express from "express";
import "dotenv/config";
import authCtrl from "../../controllers/auth-controller.js";
import { authSchema } from "../../models/index.js";
import { validateBody } from "../../decorators/index.js";
import { authenticate } from "../../middlewares/index.js";

const router = express.Router();

router.post("/register", validateBody(authSchema), authCtrl.register);

router.post("/login", validateBody(authSchema), authCtrl.login);

router.get("/current", authenticate, authCtrl.getCurrent);

router.post("/logout", authenticate, authCtrl.logout);

export default router;
