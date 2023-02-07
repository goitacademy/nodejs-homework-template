const express = require("express");
const { tryCatchWrapper } = require("../../helpers/index");
const {
  getContacts,
  getContact,
  createContact,
  removedContact,
  createPutContact,
} = require("../../controllers/contacts.controllers");

const { validate } = require("../../middlewares/index");
const { addContactSchema } = require("../../schemas/contacts");

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

module.exports = router;
