const express = require("express");
const router = express.Router();
const {
  getListOfContacts,
  getContact,
  createContact,
  deleteContact,
  editContact,
  updateStatusContact,
} = require("../../controllers");
const {
  validateBody,
  checkIfBodyExists,
  checkIfBodyStatusExists,
  auth,
} = require("../../middleWares");
const { contactSchema, contactStatusSchema } = require("../../schema");
const { tryCatcher } = require("../../helpers");

router.get("/", tryCatcher(auth), tryCatcher(getListOfContacts));

router.get("/:contactId", tryCatcher(auth), tryCatcher(getContact));

router.post(
  "/",
  tryCatcher(auth),
  validateBody(contactSchema),
  tryCatcher(createContact)
);

router.delete("/:contactId", tryCatcher(auth), tryCatcher(deleteContact));

router.patch(
  "/:contactId/favorite",
  tryCatcher(auth),
  checkIfBodyStatusExists(),
  validateBody(contactStatusSchema),
  tryCatcher(updateStatusContact)
);

router.put(
  "/:contactId",
  tryCatcher(auth),
  checkIfBodyExists(),
  validateBody(contactSchema),
  tryCatcher(editContact)
);

module.exports = router;
