const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers");
const { validateBody } = require("../../middlewares");
const { schema } = require("../../models/contact");
const { isValidId } = require("../../middlewares");

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", isValidId, ctrl.getContactById);

router.post("/", validateBody(schema.contactAddSchema), ctrl.addContact);

router.put(
  "/:contactId",
  validateBody(schema.contactAddSchema),
  isValidId,
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  validateBody(schema.changeFavorContactSchema),
  isValidId,
  ctrl.updateStatusContact
);

router.delete("/:contactId", isValidId, ctrl.deleteContact);

module.exports = router;
