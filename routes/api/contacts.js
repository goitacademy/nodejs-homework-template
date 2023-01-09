const express = require("express");

const { auth, validation, ctrllWrapper } = require("../../middlewares");

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

router.get("/", auth, ctrllWrapper(getContacts));
router.get("/:id", auth, ctrllWrapper(getContactById));
router.delete("/:id", auth, ctrllWrapper(deleteContact));

router.post("/", auth, contactCreateValidation, ctrllWrapper(addNewContact));

router.put("/:id", auth, contactUpdateValidation, ctrllWrapper(updateContact));
router.patch(
  "/:id/favorite",
  auth,
  contactFavoriteValidation,
  ctrllWrapper(updateContactFavorite)
);

module.exports = router;
