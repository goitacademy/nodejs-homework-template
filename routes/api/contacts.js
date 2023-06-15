const express = require("express");
const ctrl = require("../../controllers/contacts");
const {
  validateBody,
  validateUpdateBody,
  validateFavorite,
  isValidId,
} = require("../../middlewares");
const { schemas } = require("../../models/contactModel");

const router = express.Router();

router.get("/", ctrl.getAllContacts);

router.get("/:contactId",isValidId, ctrl.getContactById);

router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

router.delete("/:contactId",isValidId, ctrl.deleteContactById );

router.put(
  "/:contactId",
  isValidId,
  validateUpdateBody(schemas.addSchema),
  ctrl.updateContactById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateFavorite(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);

module.exports = router;
