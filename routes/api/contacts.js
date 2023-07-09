const express = require("express");
const ctrls = require("../../controllers/contacts");
const {
  validateBody,
  haveBody,
  isValidId,
  checkToken,
} = require("../../middleware/index");
const { setFavoriteSchema, contactSchema } = require("../../models/joiSchemas");

const router = express.Router();

router.get("/", checkToken, ctrls.getContacts);

router.get("/:contactId", checkToken, isValidId, ctrls.getContactById);

router.post(
  "/",
  checkToken,
  haveBody,
  validateBody(contactSchema),
  ctrls.addContact
);

router.delete("/:contactId", checkToken, isValidId, ctrls.removeContact);

router.put(
  "/:contactId",
  checkToken,
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
