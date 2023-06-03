const express = require("express");
const {
  getAllContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../controllers/contacts");
const { validateContactsBody } = require("../../middlewares");
const contactsAddSchema = require("../../structures/contacts");

const router = express.Router();

router.get("/", getAllContacts);
router.get("/:contactId", getContactById);
router.post("/", validateContactsBody(contactsAddSchema), addContact);
router.delete("/:contactId", removeContact);
router.put(
  "/:contactId",
  validateContactsBody(contactsAddSchema),
  updateContact
);

module.exports = router;
