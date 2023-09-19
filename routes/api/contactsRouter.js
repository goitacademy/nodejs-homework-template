const express = require("express");
const router = express.Router();
const { validateBody, isValidId } = require("../../middlewares");
const joiSchemas = require("../../models/contact");
const ctrl = require("../../controllers/contactsCtrl");

router.get("/", ctrl.listContacts);

router.get("/:contactId", isValidId, ctrl.getContactById);

router.post("/", validateBody(joiSchemas.newContactSchema), ctrl.addContact);

router.delete("/:contactId", isValidId, ctrl.removeContactById);

router.put(
  "/:contactId",
  isValidId,
  validateBody(joiSchemas.existingContactSchema),
  ctrl.updateContactById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(joiSchemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);
module.exports = router;
