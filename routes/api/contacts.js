const express = require("express");
const contactsModels = require("../../models/contacts");
const usersModels = require("../../models/users");

const router = express.Router();

router.get("/", async (req, res, next) => contactsModels.listContacts(res));

router.get("/:contactId", async (req, res, next) =>
  contactsModels.getContactById(req.params.contactId, res)
);
router.post("/", async (req, res, next) => contactsModels.addContact(req, res));

router.delete("/:contactId", (req, res, next) =>
  contactsModels.removeContact(req.params.contactId, res)
);

router.put("/:contactId", (req, res, next) =>
  contactsModels.updateContact(req.params.contactId, req.body, res)
);

router.patch("/:contactId/favorite", (req, res, next) =>
  contactsModels.updateStatusContact(req.params.contactId, req.body, res)
);

router.post("/users/register", async (req, res, next) =>
  usersModels.addUser(req, res)
);

router.get("/users/login", async (req, res, next) =>
  usersModels.getUser(req, res)
);

module.exports = router;
