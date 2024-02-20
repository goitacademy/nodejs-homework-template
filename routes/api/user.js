const express = require("express");
const validateUserSchema = require("../../middlewares/validateUser");
const auth = require("../../middlewares/auth");
const {
  signUp,
  logIn,
  logOut,
  current,
  changeSubscription,
} = require("../../service/controllers/userController");

const router = express.Router();

router.post("/users/singup", validateUserSchema, signUp);
router.post("users/login", validateUserSchema, logIn);
router.get("/users/logout", auth, logOut);
router.get("users/current", auth, current);
router.patch("/users", changeSubscription);
