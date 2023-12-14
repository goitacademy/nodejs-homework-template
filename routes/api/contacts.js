const express = require("express");

const ctrl = require("../../controllers/contacts");
const { isEmptyBody, validateBody } = require("../../middlewars");
const { schemas } = require("../../models/contact");
const isValidId = require("../../middlewars/isValidId");

const router = express.Router();

router.get("/", ctrl.listContact);

router.get("/:contactId", isValidId, ctrl.getContactById);

router.patch(
  "/:contactId/favorite",
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);

router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

router.put(
  "/:contactId",
  isEmptyBody,
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateContact
);
router.delete("/:contactId", isValidId, ctrl.removeContact);
module.exports = router;
