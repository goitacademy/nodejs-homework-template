const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../controllers/contacts");

const { validateBody } = require("../../middlewares/validateBody");
const { schema } = require("../../schema/contacts");

const router = express.Router();

router.get("/", listContacts);

router.get("/:contactId", getContactById);

router.post("/", addContact);

router.delete("/:contactId", validateBody(schema), removeContact);

router.put("/:contactId", validateBody(schema), updateContact);

module.exports = router;
