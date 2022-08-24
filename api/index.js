const express = require("express");
const router = express.Router();
const ctrlContacts = require("../controller/ctrlContacts.js");
const { auth } = require("../helpers/auth.js");
const ctrlUsers = require("../controller/ctrlUsers.js");

/// CONTACTS ROUTES

router.get("/contacts", auth, ctrlContacts.getAll);
router.get("/contacts/:id", auth, ctrlContacts.getById);
router.post("/contacts", auth, ctrlContacts.addContact);
router.delete("/contacts/:id", auth, ctrlContacts.removeContactById);
router.put("/contacts/:id", auth, ctrlContacts.updateContact);
router.patch("/contacts/:id/favorite", auth, ctrlContacts.updateStatus);

/// USERS ROUTES 

router.get("/users", ctrlUsers.getAllUsers);
router.post("/users/signup", ctrlUsers.registerUser);
router.post("/users/login", ctrlUsers.loginUser);
router.get("/users/logout", auth, ctrlUsers.logoutUser);
router.get("/users/current", auth, ctrlUsers.currentUser);
router.patch("/users", auth, ctrlUsers.updateUserSub);


module.exports = router;