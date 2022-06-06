const express = require("express");
const router = express.Router();
const { multerInstance } = require("../../helpers");
const usersController = require("../../controller/users");
const authMiddleware = require("../../middlewares/jwt");

router.patch(
  "/avatars", authMiddleware,
  multerInstance.single("picture"),
  usersController.setAvatar,
);

router.post("/signup", usersController.add);

router.post("/login", usersController.get);

router.post("/logout", authMiddleware, usersController.logout);

router.get("/current", authMiddleware, usersController.check);

router.patch("/", authMiddleware, usersController.subs);

module.exports = router;
