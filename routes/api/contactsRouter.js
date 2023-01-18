const express = require("express");
const router = express.Router();

const {
  addContact,
  updatePutContact,
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

router.put("/:id", validation(contactsSchema), updatePutContact);

router.patch("/:id", updatePatchContact);

module.exports = { contactsRouter: router };
