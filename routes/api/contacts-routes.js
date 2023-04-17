const express = require("express");

const router = express.Router();

const { validateBody } = require("../../utils");

const { schemas } = require("../../models/");

const ctrl = require("../../controllers/contacts-controlers");

router.get("/", ctrl.listContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

router.delete("/:contactId", ctrl.removeContact);

router.put("/:contactId", validateBody(schemas.addSchema), ctrl.updateContact);

router.patch(
  "/:contactId/favorite",
  validateBody(schemas.updateFavoritSchema),
  ctrl.updateStatusContact
);

module.exports = router;
