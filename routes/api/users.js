import { Router } from "express";

import signupUser from "../../controllers/users/signupRouters.js";
import loginUser from "../../controllers/users/loginRouters.js";
// import listUser from "../../controllers/users/listRouters.js";
import logoutUser from "../../controllers/users/logoutRouters.js";
import currentUser from "../../controllers/users/currentRouters.js";
import avatarsUser from "../../controllers/users/avatarsRouters.js";
import authMiddleware from "../../middlewares/jwt.js";
import { uploadMiddleware, jimpProcess } from "../../middlewares/avatars.js";

const router = Router();

router.post("/register", signupUser);
router.post("/login", loginUser);
// router.use("/list", authMiddleware, listUser);
router.get("/logout", authMiddleware, logoutUser);
router.get("/current", authMiddleware, currentUser);
router.patch(
    "/avatars",
    authMiddleware,
    uploadMiddleware.single("avatars"),
  jimpProcess,
  avatarsUser
);

export default router;
