const express = require("express");
const { tryCatchWrapper } = require("../../helpers");

const {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  refreshContact,
} = require("../../controllers/contacts.controller");
const { validateBody } = require("../../middlewares");
const { addContactsSchema, updateContactsSchema } = require("../../schemas");
const router = express.Router();

router.get("/", tryCatchWrapper(getContacts));

router.get("/:contactId", tryCatchWrapper(getContact));

router.post(
  "/",
  validateBody(addContactsSchema),
  tryCatchWrapper(createContact),
);

router.delete("/:contactId", tryCatchWrapper(deleteContact));

router.put(
  "/:contactId",
  validateBody(updateContactsSchema),
  tryCatchWrapper(refreshContact),
);

module.exports = router;
