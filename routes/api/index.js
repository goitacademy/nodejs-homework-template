const express = require("express");
const router = express.Router();
const auth = require("../../middleware/user");

// роутер пользователя
const authRouter = require("./auth");
router.use("/users", authRouter);

// роутер контактов с авторизацией
const contactsRouter = require("./contacts");
router.use("/contacts", auth, contactsRouter);

// роутер для загрузки аватарки пользователя с авторизацией
const avatarRouter = require("./avatars");
router.use("/avatars", auth, avatarRouter);


module.exports = router;