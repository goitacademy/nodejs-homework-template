const express = require("express");
const router = express.Router();

const {
  contacts: {
    listContacts,
    getContactById,
    addContact,
    deleteContact,
    updateContacts,
    updateFavorite,
  },
} = require("../../controllers");

const { validationBody, ctrlWrapper } = require("../../middleware");
const {
  createContactSchema,
  updateContactSchema,
  contactFavoriteSchema,
} = require("../../schemas");

const contactCreateValidation = validationBody(createContactSchema);
const contactUpdateValidation = validationBody(updateContactSchema);
const contactFavoriteValidation = validationBody(contactFavoriteSchema);

router.get("/", ctrlWrapper(listContacts));
router.get("/:id", ctrlWrapper(getContactById));
router.delete("/:id", ctrlWrapper(deleteContact));

router.post("/", contactCreateValidation, ctrlWrapper(addContact));

router.put("/:id", contactUpdateValidation, ctrlWrapper(updateContacts));
router.patch(
  "/:id/favorite",
  contactFavoriteValidation,
  ctrlWrapper(updateFavorite)
);

module.exports = router;
