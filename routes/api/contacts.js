const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts");

const { schemas } = require("../../models/contact");
const { validateBody, isValidId } = require("../../midlewares");

router.get("/", ctrl.listContacts);

router.get("/:contactId", isValidId, ctrl.getContactById);

router.post("/", validateBody(schemas.joiSchema), ctrl.addContact);

router.delete("/:contactId", isValidId, ctrl.removeContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.joiSchema),
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.favoriteSchema),
  ctrl.updateStatusContact
);

module.exports = router;
