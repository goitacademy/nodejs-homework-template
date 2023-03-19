const express = require("express");

const { validationMiddleware } = require("../../middlewares/validateContacts");

const {
  getContactById,
  addContact,
  removeContact,
  updateContact,
  getContactsAll,
  updateStatusContact,
} = require("../../controllers/contactsControlers");

const {
  addContactSchema,
  putContactShema,
  updateStatusSchema,
} = require("../../validation/validationSchemas");

const router = express.Router();
const { tryCatchWrapper } = require("../../utils/tryCatchWrapper");

router.get("/", tryCatchWrapper(getContactsAll));

router.get("/:contactId", tryCatchWrapper(getContactById));

router.post(
  "/",
  validationMiddleware(addContactSchema),
  tryCatchWrapper(addContact)
);

router.delete("/:contactId", tryCatchWrapper(removeContact));

router.put(
  "/:contactId",
  validationMiddleware(putContactShema),
  tryCatchWrapper(updateContact)
);

router.patch(
  "/:contactId/favorite",
  validationMiddleware(updateStatusSchema),
  tryCatchWrapper(updateStatusContact)
);

module.exports = router;
