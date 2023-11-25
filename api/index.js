const express = require("express");
const router = express.Router();
const contactsTask = require("../controller/contacts");
const userTask = require("../controller/user");
const multer = require("multer");
const avatarStorage = multer.memoryStorage();
const avatarUpload = multer({ storage: avatarStorage });

router.get("/contacts", contactsTask.get);

router.get("/contacts/:id", contactsTask.getById);

router.post("/contacts", contactsTask.create);

router.put("/contacts/:id", contactsTask.update);

router.patch("/contacts/:id/favorite", contactsTask.updateFavorite);

router.delete("/contacts/:id", contactsTask.remove);

router.post("/users/signup", userTask.register);

router.post("/users/login", userTask.login);

router.get("/users/logout", userTask.auth, userTask.logout);

router.get("/users/current", userTask.auth, userTask.listUser);

router.patch("/users/avatars", userTask.auth, avatarUpload.single("avatar"), userTask.updateAvatar);

module.exports = router;
