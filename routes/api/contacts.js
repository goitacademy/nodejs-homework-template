const express = require("express");
const {
 getContacts,
 getContact,
 createContact,
 deleteContact,
changeContact,
changeFavoriteContact,
} = require("../../controllers/contacts.controller");

const router = express.Router();

const { favoriteSchema, addContactSchema } = require("../../schemas/contactsSchema");
const {
  validationFavorite,
  tryCatchWrapper,
  validationContact,
} = require("../../middleware/index");


router.get("/", tryCatchWrapper(getContacts));
router.get("/:contactId", tryCatchWrapper(getContact));
router.post("/", tryCatchWrapper(createContact));
router.delete("/:contactId", tryCatchWrapper(deleteContact));
router.put("/:contactId", validationContact(addContactSchema),
tryCatchWrapper(changeContact));
router.patch(
  "/:contactId/favorite",
  validationFavorite(favoriteSchema),
  tryCatchWrapper(changeFavoriteContact)
);

module.exports = router;