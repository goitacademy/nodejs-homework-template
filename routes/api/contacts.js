const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers");
const { validateBody, isValidId } = require("../../middlewares");
const schemas = require("../../schemas/contacts");
router.get("/", ctrl.getAllContacts);

router.get("/:contactId", isValidId, ctrl.getContactById);

router.post("/", validateBody(schemas.schema), ctrl.addContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.schema),
  ctrl.updateContactById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);

router.delete("/:contactId", isValidId, ctrl.deleteContact);
module.exports = router;
