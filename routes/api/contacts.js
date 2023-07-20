const express = require("express");
const ctrls = require("../../controllers/contacts");
const {
  validateBody,
  haveBody,
  validateFavorite,
  isValidId,
} = require("../../middleware");

const router = express.Router();

router.get("/", ctrls.listContacts);

router.get("/:contactId", isValidId, ctrls.getContactById);

router.post("/", haveBody, validateBody, ctrls.addContact);

router.delete("/:contactId", isValidId, ctrls.removeContact);

router.put(
  "/:contactId",
  haveBody,
  isValidId,
  validateBody,
  ctrls.updateContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  haveBody,
  validateFavorite,
  ctrls.updateStatusContact
);

module.exports = router;
