const express = require("express");
const ctrl = require("../../controllers/contacts");
const router = express.Router();
const validateBody = require("../../midlewares/validateBody");
const validateBodyFavorite = require("../../midlewares/validateFavoriteBody");
const isValidId = require("../../midlewares/isValidId");
const { shemas } = require("../../models/contact");
router.get("/", ctrl.getAllContacts);

router.get("/:contactId", isValidId, ctrl.getContatcById);

router.post("/", validateBody(shemas.addSchema), ctrl.postContact);
router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBodyFavorite(shemas.updateFavoriteSchema),
  ctrl.updateCFavorite
);

router.delete("/:contactId", isValidId, ctrl.deleteContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(shemas.addSchema),
  ctrl.updateContactById
);

module.exports = router;
