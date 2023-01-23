const express = require("express");
const router = express.Router();

const {
  addContact,
  updatePatchContact,
  listContacts,
  getById,
  removeContact,
} = require("../../controllers/contactsControllers");

const validation = require("../../middlewares/validationMiddleware");
const contactsSchema = require("../../validationSchemas/contactsSchema");

router.get("/", listContacts);

router.get("/:id", getById);

router.post("/", validation(contactsSchema), addContact);

router.delete("/:id", removeContact);

router.patch("/:id", validation(contactsSchema), updatePatchContact);

module.exports = { contactsRouter: router };
