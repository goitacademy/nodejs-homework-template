const express = require("express");

const {
  contactValidation,
  ctrlWrapper,
  isValidId,
} = require("../../middlewares");

const {
  postJoiContactSchema,
  putJoiContactSchema,
  favoriteJoiSchema,
} = require("../../joiSchemas.js");

const { contacts: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.listContacts));

router.get("/:contactId", isValidId, ctrlWrapper(ctrl.getContactById));

router.post(
  "/",
  contactValidation(postJoiContactSchema),
  ctrlWrapper(ctrl.addContact)
);

router.put(
  "/:contactId",
  isValidId,
  contactValidation(putJoiContactSchema),
  ctrlWrapper(ctrl.updateContactById)
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  contactValidation(favoriteJoiSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

router.delete("/:contactId", ctrl.removeContact);

module.exports = router;