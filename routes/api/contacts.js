const express = require("express");
const router = express.Router();
const tryCatchWrapper = require("../../helpers");
const {
  contactsSchema,
  updateStatusSchema,
} = require("../../schema/contactsSchema");
const validate = require("../../middleware/validationWare");

const {
  listContacts,
  getContact,
  createContact,
  deleteContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contacsControllers");

router.get("/", tryCatchWrapper(listContacts));

router.get("/:contactId", tryCatchWrapper(getContact));

router.post("/", validate(contactsSchema), tryCatchWrapper(createContact));

router.delete("/:contactId", tryCatchWrapper(deleteContact));

router.put(
  "/:contactId",
  validate(contactsSchema),
  tryCatchWrapper(updateContact)
);

router.patch(
  "/:contactId/favorite",
  validate(updateStatusSchema),
  tryCatchWrapper(updateStatusContact)
);

module.exports = router;
