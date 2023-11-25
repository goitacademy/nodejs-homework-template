const express = require("express");

const UserController = require("../../controllers/auth");

const { authenticate, upload } = require("../../middlewares");

const jsonParser = express.json();

const router = express.Router();

router.post("/register", jsonParser, UserController.register);

router.post("/login", jsonParser, UserController.login);

router.get("/current", authenticate, UserController.current);

router.post("/logout", authenticate, UserController.logout);

router.patch("/", authenticate, jsonParser, UserController.updateStatusUser);

router.patch("/avatars", authenticate, upload.single("avatar"), UserController.updateAvatar);

module.exports = router;