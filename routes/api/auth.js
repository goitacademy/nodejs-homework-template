const express = require("express");
const validateUserSchema = require("../../service/Schemas/userSchema");
const { signUp } = require("../../service/controllers/userController");

const router = express.Router();

router.post("/users/singup", validateUserSchema, signUp);
