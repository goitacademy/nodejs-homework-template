const express = require("express");

const ctrl = require("../../controllers/contacts-controllers");

const { validateBody } = require("../../utils");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", ctrl.getAllContacts);

router.get("/:id", ctrl.getContactById);

router.post("/", validateBody(schemas.addSchema), ctrl.addNewContact);

router.delete("/:id", ctrl.deleteContactById);

router.put("/:id", validateBody(schemas.addSchema), ctrl.updateOneContact);

router.patch(
  "/:id/favorite",
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);

module.exports = router;
