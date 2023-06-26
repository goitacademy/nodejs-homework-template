const express = require("express");
const ctrl = require("../../controllers/contacts");
const {
  validateBody,
  validateUpdateBody,
  validateFavorite,
  isValidId,
  authenticate,
} = require("../../middlewares");
const { schemas } = require("../../models/contactModel");

const router = express.Router();

router.get("/",authenticate, ctrl.getAllContacts);

router.get("/:contactId", authenticate, isValidId, ctrl.getContactById);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema),
  ctrl.addContact
);

router.delete("/:contactId", authenticate, isValidId, ctrl.deleteContactById);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateUpdateBody(schemas.addSchema),
  ctrl.updateContactById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  authenticate,
  validateFavorite(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);

module.exports = router;
