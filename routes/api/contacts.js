const express = require("express");

const contactsControllers = require("../../controllers/contacts-controller.js");

const isValidId = require("../../middlewares/isValidId.js");

const isEmptyBody = require("../../middlewares/isEmptyBody.js");

const validateBody = require("../../decorators/validateBody.js");

const {
  contactAddSchema,
  contactUpdateFavoriteSchema,
} = require("../../models/Contact.js");

const contactAddValidation = validateBody(contactAddSchema);
const contactUpdateFavoriteValidate = validateBody(contactUpdateFavoriteSchema);

const router = express.Router();

router.get("/", contactsControllers.getAll);

router.get("/:contactId", isValidId, contactsControllers.getById);

router.post("/", isEmptyBody, contactAddValidation, contactsControllers.add);

router.put(
  "/:contactId",
  isEmptyBody,
  contactAddValidation,
  isValidId,
  contactsControllers.updateById
);

router.patch(
  "/:contactId/favorite",
  isEmptyBody,
  contactUpdateFavoriteValidate,
  isValidId,
  contactsControllers.updateStatusContact
);

router.delete("/:contactId", isValidId, contactsControllers.deleteById);

module.exports = router;
