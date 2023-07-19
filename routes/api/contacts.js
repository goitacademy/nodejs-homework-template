const express = require("express");
const ctrls = require("../../controllers/contacts");
const {
  validateBody,
  haveBody,
  validateFavorite,
} = require("../../middleware");

const router = express.Router();

router.get("/", ctrls.listContacts);

router.get("/:contactId", ctrls.getContactById);

router.post("/", haveBody, validateBody, ctrls.addContact);

router.delete("/:contactId", ctrls.removeContact);

router.put("/:contactId", haveBody, validateBody, ctrls.updateContact);

router.patch(
  "/:contactId/favorite",
  haveBody,
  validateFavorite,
  ctrls.updateStatusContact
);

module.exports = router;
