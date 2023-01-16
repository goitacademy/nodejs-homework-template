const express = require('express')
const {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  contactToUpdate,
  contactStatusToUpdate,
} = require("../../controllers/contactsController");
const { validateBody } = require("../../middlewares/index");
const {
  addContactSchema,
  updatedStatusContactSchema,
} = require("../../schemas/contactsSchemas");

const router = express.Router()

router.get('/', getContacts)

router.get("/:contactId", getContact);

router.post("/", validateBody(addContactSchema), createContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", validateBody(addContactSchema), contactToUpdate);

router.patch(
  "/:contactId/favorite",
  validateBody(updatedStatusContactSchema),
  contactStatusToUpdate
);

module.exports = router
