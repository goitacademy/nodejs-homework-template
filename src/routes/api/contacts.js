const express = require("express");
const { tryCatchWrapper } = require("../../helpers/index");

const {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  refreshContact,
  refreshContactStatus,
} = require("../../controllers/contacts.controller");
const { validateBody } = require("../../middlewares");
const {
  addContactsSchema,
  updateContactsSchema,
  validationSchemaStatus,
} = require("../../schemas");
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
router.patch(
  "/:contactId/favorite",
  validateBody(validationSchemaStatus),
  tryCatchWrapper(refreshContactStatus),
);

module.exports = router;
