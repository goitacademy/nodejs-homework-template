const express = require("express");

const { isEmptyBody, isValidId } = require("../../middlewares");

const contactsController = require("../../controllers/contacts-controller");

const decorators = require("../../decorators");

const {
  contactAddSchema,
  contactUpdateFavoriteSchema,
} = require("../../models/Contact");

const contactAddValidate = decorators.validateBody(contactAddSchema);
const contactUpdateFavoriteValidate = decorators.validateBody(
  contactUpdateFavoriteSchema
);

const router = express.Router();

router.get("/", contactsController.getAll);

router.get("/:contactId", isValidId, contactsController.getById);

router.post("/", isEmptyBody, contactAddValidate, contactsController.add);

router.delete("/:contactId", isValidId, contactsController.deleteById);

router.put(
  "/:contactId",
  isValidId,
  isEmptyBody,
  contactAddValidate,
  contactsController.updateById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  isEmptyBody,
  contactUpdateFavoriteValidate,
  contactsController.updateStatusContact
);

module.exports = router;
