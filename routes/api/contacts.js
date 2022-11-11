const express = require("express");
const { ctrlWrapper } = require("../../helpers");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContactID,
} = require("../../controllers/contacts");

const validateBody = require("../../middelwares");
const schemas = require("../../schemas/schemas");

const router = express.Router();

router.get("/", ctrlWrapper(listContacts));

router.get("/:contactId", ctrlWrapper(getContactById));

router.post("/", validateBody(schemas.addSchema), ctrlWrapper(addContact));

router.delete("/:contactId", ctrlWrapper(removeContact));

router.put("/:contactId", validateBody(schemas), ctrlWrapper(updateContactID));

module.exports = router;
