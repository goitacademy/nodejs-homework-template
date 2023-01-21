const express = require("express");
const router = express.Router();

const {
  ctrlGetContacts,
  ctrlGetContactById,
  ctrlAddContact,
  ctrlRemoveContact,
  ctrlUpdateStatusContact,
  ctrlUpdateContact,
} = require("../../models/contacts");

const { addPostValidation } = require("../../middlewares/validationMiddleware");

router.get("/", ctrlGetContacts);

router.get("/:contactId", ctrlGetContactById);

router.post("/", addPostValidation, ctrlAddContact);

router.put("/:contactId", addPostValidation, ctrlUpdateContact);

router.patch(
  "/contacts/:contactId/favorite",
  addPostValidation,
  ctrlUpdateStatusContact
);

router.delete("/:contactId", ctrlRemoveContact);

module.exports = router;
