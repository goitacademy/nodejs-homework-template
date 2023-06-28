const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth/auth");
const ctrlUsers = require("../controller/users");
const ctrlContact = require("../controller/contacts");

router.get("/users/current", auth, ctrlUsers.getCurrent);

router.post("/users/signup", ctrlUsers.signup);

router.post("/users/login", ctrlUsers.login);

router.post("/users/logout", auth, ctrlUsers.logout);

router.patch("/users/", auth, ctrlUsers.setSubscription);

router.get("/contacts", auth, ctrlContact.getContacts);

router.get("/contacts/:contactId", auth, ctrlContact.getContactById);

router.post("/contacts", auth, ctrlContact.create);

router.put("/contacts/:contactId", auth, ctrlContact.update);

router.patch("/contacts/:contactId/favorite", auth, ctrlContact.updateStatus);

router.delete("/contacts/:contactId", auth, ctrlContact.remove);

module.exports = router;
