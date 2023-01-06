const express = require("express");
const router = express.Router();
const {
  getListOfContacts,
  getContact,
  createContact,
  deleteContact,
  editContact,
} = require("../../controllers/contact.controller");
const { validateBody } = require("../../middleWares/validateBody");
const {
  contactSchema,
  checkIfBodyExists,
} = require("../../schema/validateSchema");

router.get("/", getListOfContacts);

router.get("/:contactId", getContact);

router.post("/", validateBody(contactSchema), createContact);

router.delete("/:contactId", deleteContact);

router.put(
  "/:contactId",
  checkIfBodyExists(),
  validateBody(contactSchema),
  editContact
);

module.exports = router;
