const express = require("express");
const ctrls = require("../../controllers/contacts");
const {
  validateBody,
  haveBody,
  isValidId,
} = require("../../middleware/index");
const { setFavoriteSchema, contactSchema } = require("../../models/joiSchemas");

const router = express.Router();

router.get("/", ctrls.getContacts);

router.get("/:contactId", isValidId, ctrls.getContactById);

router.post("/", haveBody, validateBody(contactSchema), ctrls.addContact);

router.delete("/:contactId", isValidId, ctrls.removeContact);

router.put(
  "/:contactId",
  haveBody,
  validateBody(contactSchema),
  ctrls.updateContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(setFavoriteSchema),
  ctrls.updateStatusContact
);

module.exports = router;
