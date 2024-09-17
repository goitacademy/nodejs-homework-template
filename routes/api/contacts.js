const express = require("express");

const ctrl = require("../../controllers/contacts-controllers");

const { validateBody } = require("../../utils/validation");

const { schemas } = require("../../models/contacts");

const router = express.Router();

router.get("/", ctrl.getContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

router.delete("/:contactId", ctrl.removeContact);

router.put(
  "/:contactId",
  validateBody(schemas.addSchema),
  ctrl.updateContactById
);

router.patch(
  "/:contactId/:favorite",
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateFavoriteById
);

module.exports = router;
