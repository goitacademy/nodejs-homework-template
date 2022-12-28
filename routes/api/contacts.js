const express = require("express");

const { validation, ctrllWrapper } = require("../../middlewares");

const {
  contacts: {
    getContacts,
    getContactById,
    addNewContact,
    deleteContact,
    updateContact,
    updateContactFavorite,
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

router.get("/", ctrllWrapper(getContacts));
router.get("/:id", ctrllWrapper(getContactById));
router.delete("/:id", ctrllWrapper(deleteContact));

router.post("/", contactCreateValidation, ctrllWrapper(addNewContact));

router.put("/:id", contactUpdateValidation, ctrllWrapper(updateContact));
router.patch(
  "/:id/favorite",
  contactFavoriteValidation,
  ctrllWrapper(updateContactFavorite)
);

module.exports = router;
