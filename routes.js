const express = require("express");
const router = express.Router();
const auth = require("./auth");
const { uploadMiddleware } = require('./upload');

const contactsController = require("./controllers/contacts.controller");
const usersController = require("./controllers/users.controller");

router.get("/contacts", auth, contactsController.get);
router.get("/contacts/:id", auth, contactsController.getById);
router.post("/contacts", auth, contactsController.create);
router.put("/contacts/:id", auth, contactsController.update);
router.patch("/contacts/:id/favorite",auth,  contactsController.updateStatus);
router.delete("/contacts/:id", auth, contactsController.remove);

// users

router.post("/users/signup", usersController.signUp);
router.post("/users/login", usersController.login);
router.get("/users/logout", auth, usersController.logout);
router.get("/users/current", auth, usersController.current);
router.patch('/avatars', auth, uploadMiddleware.single('avatar'), usersController.updateAvatar);

module.exports = router;
