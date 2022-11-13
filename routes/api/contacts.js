const express = require("express");
const { tryCatchWrapper, auth } = require("../../middleware");
const { validation } = require("../../middleware");
const {
  requestBodySchema,
  contactStatusSchema,
} = require("../../validationSchemas");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contacts.controller");

const router = express.Router();

router.get("/", auth, tryCatchWrapper(listContacts));

router.get("/:contactId", auth, tryCatchWrapper(getContactById));

router.post(
  "/",
  auth,
  validation(requestBodySchema),
  tryCatchWrapper(addContact)
);

router.delete("/:contactId", auth, tryCatchWrapper(removeContact));

router.put(
  "/:contactId",
  auth,
  validation(requestBodySchema),
  tryCatchWrapper(updateContact)
);

router.patch(
  "/:contactId/favorite",
  auth,
  validation(contactStatusSchema),
  tryCatchWrapper(updateStatusContact)
);

module.exports = router;
