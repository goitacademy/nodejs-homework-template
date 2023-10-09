const express = require("express");

const {
  getContactsList,
  getContactById,
  addNewContact,
  removeContactById,
  updateContactById,
  updateStatusContact,
} = require("../../controllers");

const router = express.Router();

const { isEmptyBody, isValidId } = require("../../middlewares");
const { validateBody } = require("../../decorators");
const {
  contactAddSchema,
  contactUpdateFavoriteSchema,
} = require("../../schema");

const contactAddValidate = validateBody(contactAddSchema);
const contactUpdateFavoriteValidate = validateBody(contactUpdateFavoriteSchema);

router.get("/", getContactsList);

router.get("/:id", isValidId, getContactById);

router.post("/", isEmptyBody, contactAddValidate, addNewContact);

router.delete("/:id", isValidId, removeContactById);

router.put(
  "/:id",
  isValidId,
  isEmptyBody,
  contactAddValidate,
  updateContactById
);

router.patch(
  "/:id/favorite",
  isValidId,
  isEmptyBody,
  contactUpdateFavoriteValidate,
  updateStatusContact
);

module.exports = router;
