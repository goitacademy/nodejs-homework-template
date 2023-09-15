const express = require("express");
const router = express.Router();
const joiSchemas = require("../../models/contactsModel");
const { validateBody, isValideId } = require("../../middlewares");
const ctrl = require("../../controllers/contacts");

router.get("/", ctrl.listContacts);

router.get("/:contactId", isValideId, ctrl.getContactById);

router.post("/", validateBody(joiSchemas.newContactSchema), ctrl.addContact);

router.delete("/:contactId", isValideId, ctrl.removeContactById);

router.put(
  "/:contactId",
  validateBody(joiSchemas.existingContactSchema),
  ctrl.updateContactById
);

router.patch(
  "/:contactId/favorite",
  isValideId,
  validateBody(joiSchemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);
module.exports = router;
