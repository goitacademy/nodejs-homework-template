const express = require("express");

const ctrl = require("../../controllers/contacts-controllers");

const { isValidId, authenticate } = require("../../middlewares");

const { validateBody } = require("../../utils/validation");

const { schemas } = require("../../models/contacts");

const router = express.Router();

router.get("/", authenticate, ctrl.getContacts);

router.get("/:contactId", authenticate, isValidId, ctrl.getContactById);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema),
  ctrl.addContact
);

router.delete("/:contactId", authenticate, isValidId, ctrl.removeContact);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateContactById
);

router.patch(
  "/:contactId/:favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateFavoriteById
);

module.exports = router;
