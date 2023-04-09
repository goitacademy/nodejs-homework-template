const express = require("express");

const { validateBody } = require("../../utils");

const { addSchema } = require("../../schemas/contacts");

const {
  addContact,
  getAllContacts,
  deleteContact,
  updateContact,
  getContactById,
} = require("../../controllers/contacts");

const router = express.Router();

router.get("/", getAllContacts);

router.get("/:contactId", getContactById);

router.post("/", validateBody(addSchema), addContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", validateBody(addSchema), updateContact);

module.exports = router;
