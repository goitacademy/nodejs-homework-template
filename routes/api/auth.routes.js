import express from "express";
import authController from "../../controllers/auth.controller";
import auth from "../../middlewares/auth";
const router = express.Router();

router.post("/login", authController.login);
router.post("/signup", authController.signup);
router.get("/logout", auth, authController.logout);
router.get("/current", auth, authController.current);

export default router