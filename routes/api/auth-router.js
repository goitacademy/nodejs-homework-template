import express from "express";
import "dotenv/config";
import authCtrl from "../../controllers/auth-controller.js";
import { authSchema, subscriptionSchema } from "../../models/index.js";
import { validateBody } from "../../decorators/index.js";
import { authenticate } from "../../middlewares/index.js";
//
import multer from "multer";
import { upload } from "../../app.js";

const router = express.Router();

router.patch("/", authenticate, validateBody(subscriptionSchema), authCtrl.subscriptionChange);

router.post("/register", validateBody(authSchema), authCtrl.register);

router.post("/login", validateBody(authSchema), authCtrl.login);

router.get("/current", authenticate, authCtrl.getCurrent);

router.post("/logout", authenticate, authCtrl.logout);

// router.patch("/avatars", authenticate, upload.single("avatarURL"), async (req, res) => {
//   console.log("req.file :>> ", req.file);
//   console.log("req.file :>> ", req.file);
//   res.status(401).json({ message: `File have saved in ${req.file.path}` });
// });

export default router;
