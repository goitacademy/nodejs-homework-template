const express = require("express");

const router = express.Router();

const controls = require("../../controllers");

const { validateBody, isValidId } = require("../../middlewares");

const {
  contactValidationScheme,
  contactFavoriteValidationScheme,
} = require("../../schemes");

router.get("/", controls.getAllContacts);

router.get("/:contactId", isValidId, controls.getContactById);

router.post("/", controls.addNewContact);

router.delete("/:contactId", isValidId, controls.removeContactById);

router.put(
  "/:contactId",
  validateBody(contactValidationScheme),
  controls.updateContactById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(contactFavoriteValidationScheme),
  controls.updateFavorite
);

module.exports = router;
