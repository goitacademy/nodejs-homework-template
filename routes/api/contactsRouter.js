const express = require("express");
const router = express.Router();

const {
  ctrlGetContacts,
  ctrlGetContactById,
  ctrlAddContact,
  ctrlRemoveContact,
  ctrlUpdateStatusContact,
  ctrlUpdateContact,
} = require("../../controllers/contactsControllers");

const { auth } = require("../../middlewares/auth");

const { addPostValidation } = require("../../middlewares/validationMiddleware");

router.get("/", auth, ctrlGetContacts);

router.get("/:contactId", ctrlGetContactById);

router.post("/", auth, addPostValidation, ctrlAddContact);

router.delete("/:contactId", ctrlRemoveContact);

router.put("/:contactId", addPostValidation, ctrlUpdateContact);

router.patch("/:contactId/favorite", ctrlUpdateStatusContact);

module.exports = router;
