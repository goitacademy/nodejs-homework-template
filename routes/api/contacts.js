const express = require("express");
const contactsControllers = require("../../controllers/contacts-controllers.js");
const isEmptyBody = require("../../middlewares/isEmptyBody.js");
const validateBody = require("../../decorators/validateBody.js");
const {
  contactAddSchema,
  contactUpdateFavoriteSchema,
} = require("../../models/Contact.js");
const isValidId = require("../../middlewares/isValidId.js");

const contactAddValidate = validateBody(contactAddSchema);
const contactUpdateValidate = validateBody(contactUpdateFavoriteSchema);

const router = express.Router();

router.get("/", contactsControllers.getAll);

router.get("/:contactId", isValidId, contactsControllers.getById);

router.delete("/:contactId", isValidId, contactsControllers.deleteById);

router.post("/", isEmptyBody, contactAddValidate, contactsControllers.add);

router.put(
  "/:contactId",
  isValidId,
  isEmptyBody,
  contactAddValidate,
  contactsControllers.updateById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  isEmptyBody,
  contactUpdateValidate,
  contactsControllers.updateStatusContact
);

module.exports = router;
