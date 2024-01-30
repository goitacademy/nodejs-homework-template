const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");

const {
  validateBody,
  isValidId,
  validateFavorite,
} = require("../../middlewares");

const { schemas } = require("../../models/contact");
router.get("/", ctrl.get);
router.get("/:contactId", isValidId, ctrl.getContactById);
router.post("/", validateBody(schemas.addSchema), ctrl.addContact);
router.delete("/:contactId", isValidId, ctrl.removeContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.updateSchema),
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateFavorite(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);
module.exports = router;
