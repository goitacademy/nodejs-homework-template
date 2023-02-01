const express = require("express");
const router = express.Router();

const {
  ctrlGetContacts,
  ctrlGetContactById,
  ctrlAddContact,
  ctrlRemoveContact,
  ctrlUpdateStatusContact,
  ctrlUpdateContact,
  ctrlGetContactByFavorite,
} = require("../../controllers/contactsControllers");

const { auth } = require("../../middlewares/auth");

const { addPostValidation } = require("../../middlewares/validationMiddleware");

router.get("/", auth, ctrlGetContacts);

router.get("/:contactId", auth, ctrlGetContactById);

router.post("/", auth, addPostValidation, ctrlAddContact);

router.delete("/:contactId", auth, ctrlRemoveContact);

router.put("/:contactId", auth, addPostValidation, ctrlUpdateContact);

router.patch("/:contactId/favorite", auth, ctrlUpdateStatusContact);

module.exports = router;
