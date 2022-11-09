const express = require("express");

const router = express.Router();

const tryCatchWrapper = require("../../helpers");

const {
  getContacts,
  getContactByID,
  postContact,
  deleteContact,
  putContact,
} = require("../../controllers/contacts.controllers");
const validationBody = require("../../middleware/validationBody");
const {
  schemaPostContact,
  schemaPutContact,
  schemaPatchContact,
} = require("../../schemas.joi/schema.joi");

router.get("/", tryCatchWrapper(getContacts));

router.get("/:contactId", tryCatchWrapper(getContactByID));

router.post(
  "/",
  validationBody(schemaPostContact),
  tryCatchWrapper(postContact)
);

router.delete("/:contactId", tryCatchWrapper(deleteContact));

router.put(
  "/:contactId",
  validationBody(schemaPutContact),
  tryCatchWrapper(putContact)
);
router.patch(
  "/:contactId/favorite",
  validationBody(schemaPatchContact),
  tryCatchWrapper(putContact)
);

module.exports = router;
