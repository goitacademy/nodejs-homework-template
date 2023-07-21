const ctrl = require("../../controllers/contacts");
const express = require("express");
const router = express.Router();
const { schemas } = require("../../models/contact");
const { validateBody, isValidId } = require("../../middlewares");

router.get("/", ctrl.allContacts);

router.get("/:contactId", isValidId, ctrl.idContact);

router.post("/", validateBody(schemas.addSchema), ctrl.createContact);

router.delete("/:contactId", ctrl.deleteContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.refreshContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);

module.exports = router;
