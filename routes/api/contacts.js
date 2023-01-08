const express = require("express");

const { authentication, validation, ctrlWrapper } = require("../../middleware");

const {
  contacts: {
    getContacts,
    getContactById,
    addNewContact,
    deleteContact,
    updateContact,
    updateFavorite,
  },
} = require("../../controllers");

const {
  createContactSchema,
  updateContactSchema,
  contactFavoriteSchema,
} = require("../../schemas");

const contactCreateValidation = validation(createContactSchema);
const contactUpdateValidation = validation(updateContactSchema);
const contactFavoriteValidation = validation(contactFavoriteSchema);
const router = express.Router();

router.get("/", authentication, ctrlWrapper(getContacts));
router.get("/:id", ctrlWrapper(getContactById));
router.delete("/:id", ctrlWrapper(deleteContact));

router.post(
  "/",
  authentication,
  contactCreateValidation,
  ctrlWrapper(addNewContact)
);

router.put("/:id", contactUpdateValidation, ctrlWrapper(updateContact));
router.patch(
  "/:id/favorite",
  contactFavoriteValidation,
  ctrlWrapper(updateFavorite)
);

module.exports = router;
