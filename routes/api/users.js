const express = require("express");

const {
  registerUserController,
  loginUserController,
  logoutUserController,
  refreshUserController,
} = require("../../controllers/users");

const router = express.Router();

router.post("/signup", registerUserController);

router.post("/login", loginUserController);

router.post("/logout", logoutUserController);

router.get("/current", refreshUserController);
