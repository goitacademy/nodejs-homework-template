const express = require("express");

const router = express.Router();

const { validateBody, isValidId } = require("../../middlewares");
const { schemas } = require("../../models/contact");

const ctrl = require("../../controllers/contacts");

router.get("/", ctrl.getListContacts);

router.get("/:contactId", isValidId, ctrl.getContactById);

router.post("/", validateBody(schemas.addValidateSchema), ctrl.addContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.addValidateSchema),
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);

router.delete("/:contactId", isValidId, ctrl.removeContact);

module.exports = router;
