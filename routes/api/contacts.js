const express = require("express");
const { contacts: ctrl } = require("../../controllers");
const router = express.Router();

const { authenticate } = require("../../middlewares");

const { isValidId } = require("../../middlewares");
const { validateBody } = require("../../utils");
const { schemas } = require("../../models/contacts");

router.get("/", authenticate, ctrl.listContacts);

router.get("/:id", authenticate, isValidId, ctrl.getContactById);

router.post(
  "/",
  authenticate,
  validateBody(schemas.contactJoiSchema),
  ctrl.addContact
);

router.delete("/:id", authenticate, isValidId, ctrl.removeContact);

router.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(schemas.contactJoiSchema),
  ctrl.updateContact
);

router.patch(
  "/:id/favorite",
  isValidId,
  authenticate,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateFavoriteField
);

module.exports = router;
