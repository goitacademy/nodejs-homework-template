const express = require("express");
const ctrl = require("../../controllers/contacts-controllers");
const router = express.Router();
const { validateBody } = require("../../decorators");

const { schemas } = require("../../models/contacts");

router.get("/", ctrl.listContacts);

router.get("/:id", ctrl.getContactById);

router.post("/", validateBody(schemas.contactJoiSchema), ctrl.addContact);

router.delete("/:id", ctrl.removeContact);

router.put("/:id", validateBody(schemas.contactJoiSchema), ctrl.updateContact);

router.patch(
  "/:id/favorite",
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateFavoriteField
);

module.exports = router;
