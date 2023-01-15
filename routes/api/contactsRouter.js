const express = require("express");
const router = express.Router();

const {
  addContact,
  updateContact,
  listContacts,
  getById,
  removeContact,
} = require("../../controllers/contactsControllers");

const {
  addContactValidation,
} = require("../../middlewares/validationMiddleware");

router.get("/", listContacts);

router.get("/:id", getById);

router.post("/", addContactValidation, addContact);

router.delete("/:id", removeContact);

router.patch("/:id", updateContact);

module.exports = { contactsRouter: router };
