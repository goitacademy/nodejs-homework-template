const express = require("express");

const router = express.Router();

const {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contacts");

const {
  validationCreate,
  validationUpdate,
  validationUpdateStatus,
} = require("../../middlewares/validation");

const {
  createContactSchema,
  updateContactSchema,
  updateStatusContactSchema,
} = require("../../schemas/contacts.js");

router.get("/", getContacts);
router.get("/:contactId", getContact);
router.post("/", validationCreate(createContactSchema), createContact);
router.delete("/:contactId", deleteContact);
router.put("/:contactId", validationUpdate(updateContactSchema), updateContact);
router.patch(
  "/:contactId",
  validationUpdateStatus(updateStatusContactSchema),
  updateStatusContact
);

module.exports = router;
