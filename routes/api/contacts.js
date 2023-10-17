const express = require("express");
const ctrl = require("../../controllers/contacts");
const { validateBody } = require("../../middlewars");

const router = express.Router();

const { schemas } = require("../../models/contact");

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

router.delete("/:contactId", ctrl.deleteContact);

router.put("/:contactId", ctrl.updateContact);

router.patch(
  "/:contactId/favorite",
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);

module.exports = router;
