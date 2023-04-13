const express = require("express");
const {
  register,
  login,
  getCurrentUser,
  logout,
  updateAvatar,
} = require("../../controllers/authController");
const { tryCatchWrapper } = require("../../helpers");
const { validateBody, auth, upload } = require("../../middlewares/index");
const { addUserSchema } = require("../../schemas/userSchema");

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(addUserSchema),
  tryCatchWrapper(register)
);
authRouter.post("/login", validateBody(addUserSchema), tryCatchWrapper(login));
authRouter.get("/logout", auth, tryCatchWrapper(logout));

authRouter.get("/current", auth, tryCatchWrapper(getCurrentUser));
authRouter.post(
  "/avatars",
  auth,
  upload.single("avatar"),
  tryCatchWrapper(updateAvatar)
);

module.exports = {
  authRouter,
};
