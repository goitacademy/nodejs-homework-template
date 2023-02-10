const express = require("express");
const { tryCatchWrapper } = require("../../helpers/index");
const {
  getContacts,
  getContact,
  createContact,
  removedContact,
  createPutContact,
  createStatusContact,
} = require("../../controllers/contacts.controllers");

const { validate } = require("../../middlewares/index");
const { addContactSchema, favoriteSchema } = require("../../schemas/contacts");

const router = express.Router();

router.get("/", tryCatchWrapper(getContacts));

router.get("/:contactId", tryCatchWrapper(getContact));

router.post("/", validate(addContactSchema), tryCatchWrapper(createContact));

router.delete("/:contactId", tryCatchWrapper(removedContact));

router.put(
  "/:contactId",
  validate(addContactSchema),
  tryCatchWrapper(createPutContact)
);

router.patch(
  "/:contactId/favorite",
  validate(favoriteSchema),
  tryCatchWrapper(createStatusContact)
);

module.exports = router;
