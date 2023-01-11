const express = require("express");
const router = express.Router();
const {
  getListOfContacts,
  getContact,
  createContact,
  deleteContact,
  editContact,
} = require("../../controllers/contact.controller");
const {
  validateBody,
  checkIfBodyExists,
} = require("../../middleWares/checkBodyRequest");
const { contactSchema } = require("../../schema/validateSchema");
const { tryCatcher } = require("../../helpers/helpers");

router.get("/", tryCatcher(getListOfContacts));

router.get("/:contactId", tryCatcher(getContact));

router.post("/", validateBody(contactSchema), tryCatcher(createContact));

router.delete("/:contactId", tryCatcher(deleteContact));

router.put(
  "/:contactId",
  checkIfBodyExists(),
  validateBody(contactSchema),
  tryCatcher(editContact)
);

module.exports = router;
