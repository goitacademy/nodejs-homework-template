const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/contacts-controllers");
const { validateBody } = require("../../utils");
const { schemas } = require("../../models/contacts");

router.get("/", ctrl.getAllContacts);

router.get("/:id", ctrl.getContactById);

router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

router.put("/:id", validateBody(schemas.addSchema), ctrl.updateContact);

router.delete("/:id", ctrl.deleteContact);

router.patch(
  "/:id/favorite",
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);

module.exports = router;
