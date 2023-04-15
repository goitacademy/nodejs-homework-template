const express = require("express");

const ctrl = require("../../controllers/contacts-controllers");
const { validateBody } = require("../../utils");
const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

router.delete("/:contactId", ctrl.deleteContactById);

router.put(
  "/:contactId",
  validateBody(schemas.putSchema),
  ctrl.updateContactById
);

router.patch(
  "/:contactId/favorite",
  validateBody(schemas.patchFavoriteSchema),
  ctrl.updateStatusContact
);

module.exports = router;
