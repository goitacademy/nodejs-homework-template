const express = require("express");
const {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
} = require("../../controllers/contactController");

const contactSchema = require("../../schemas/contactSchema");
const { validateBody } = require("../../middleware");

const router = express.Router();

router.get("/", listContacts);
router.get("/:contactId", getById);
router.post("/", validateBody(contactSchema), addContact);
router.delete("/:contactId", removeContact);
router.put("/:contactId", validateBody(contactSchema), updateContact);

module.exports = router;
