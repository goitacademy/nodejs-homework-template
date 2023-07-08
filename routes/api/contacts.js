const express = require("express");
const ctrls = require("../../controllers/contacts");
const {
  validateBody,
  haveBody,
  isValidId,
  validateFavorite,
} = require("../../middleware/index");

const router = express.Router();

router.get("/", ctrls.getContacts);

router.get("/:contactId", isValidId, ctrls.getContactById);

router.post("/", haveBody, validateBody, ctrls.addContact);

router.delete("/:contactId", isValidId, ctrls.removeContact);

router.put("/:contactId", haveBody, validateBody, ctrls.updateContact);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateFavorite,
  ctrls.updateStatusContact
);

module.exports = router;
