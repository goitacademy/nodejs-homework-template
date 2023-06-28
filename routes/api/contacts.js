const express = require("express");
const {
  getAll,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../controllers/contacts");
const { validateContactsBody } = require("../../middlewares");
const {
  contactsAddSchema,
  contactsUpdateSchema,
} = require("../../schemas/contacts");

const router = express.Router();

router.get("/", getAll);
router.get("/:contactId", getContactById);
router.post("/", validateContactsBody(contactsAddSchema), addContact);
router.delete("/:contactId", removeContact);
router.put(
  "/:contactId",
  validateContactsBody(contactsUpdateSchema),
  updateContact
);

module.exports = router;
