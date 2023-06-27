const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { schemas } = require("../../models/contact");
const { validateBody, isValidId } = require("../../middlewares");

router.get("/", ctrl.listContacts);

router.get("/:contactId", isValidId, ctrl.getContactById);

router.post("/", validateBody(schemas.addContactSchema), ctrl.addContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.addContactSchema),
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.favoriteContactSchema),
  ctrl.updateContact
);

router.delete("/:contactId", isValidId, ctrl.removeContact);

module.exports = router;
