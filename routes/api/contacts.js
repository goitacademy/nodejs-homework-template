const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers");
const { validateBody, isValidId, authenticate } = require("../../middlewares");
const schemas = require("../../schemas/contacts");
router.get("/", authenticate, ctrl.getAllContacts);

router.get("/:contactId", authenticate, isValidId, ctrl.getContactById);

router.post("/", authenticate, validateBody(schemas.schema), ctrl.addContact);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(schemas.schema),
  ctrl.updateContactById
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);

router.delete("/:contactId", authenticate, isValidId, ctrl.deleteContact);
module.exports = router;
