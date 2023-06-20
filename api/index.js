const express = require("express");
const router = express.Router();
const ctrlContact = require("../controller/contacts");
const ctrlUsers = require("../controller/users");
const auth = require("../middleware/auth/auth");

router.post("/users/signup", ctrlUsers.signup);

router.post("/users/login", ctrlUsers.login);

router.get("/users/current", auth, ctrlUsers.getCurrent);

router.patch("/users/", auth, ctrlUsers.setSubscription);

router.post("/users/logout", auth, ctrlUsers.logout);

router.get("/contacts", auth, ctrlContact.get);

router.get("/contacts/:id", auth, ctrlContact.getById);

router.post("/contacts", auth, ctrlContact.create);

router.put("/contacts/:id", auth, ctrlContact.update);

router.patch("/contacts/:id/isFavourite", auth, ctrlContact.updateStatus);

router.delete("/contacts/:id", auth, ctrlContact.remove);

module.exports = router;
