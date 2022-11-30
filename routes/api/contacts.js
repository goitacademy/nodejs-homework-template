const express = require("express");
const contactsModels = require("../../models/contacts");
const usersModels = require("../../models/users");
const { authMiddleware } = require("../../middlewares/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, contactsModels.listContacts);

router.get("/:contactId", authMiddleware, contactsModels.getContactById);

router.post("/", authMiddleware, contactsModels.addContact);

router.delete("/:contactId", authMiddleware, contactsModels.removeContact);

router.put("/:contactId", authMiddleware, contactsModels.updateContact);

router.patch(
  "/:contactId/favorite",
  authMiddleware,
  contactsModels.updateStatusContact
);

router.post("/users/register", usersModels.addUser);

router.get("/users/login", usersModels.getUser);

router.post("/users/logout", authMiddleware, usersModels.logOut);

router.get("/users/current", authMiddleware, usersModels.getCurrentUser);

router.patch("/users", authMiddleware, usersModels.setKindOfSubscription);

module.exports = router;
