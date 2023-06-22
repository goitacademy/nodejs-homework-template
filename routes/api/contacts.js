const express = require("express");

const { ctrlWrapper } = require("../../helpers");
const validateContact = require("../../middelewares/validateContact");
const validationFavorite = require("../../middelewares/validationFavorite ");
const isValidId = require("../../middelewares/isValidId");
const validation = require("../../middelewares/validation");

const { schemas } = require("../../models/contact");
const { contacts: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.listContacts));

router.get("/:id", isValidId, ctrlWrapper(ctrl.getById));

router.post("/", validation(schemas.addSchema), ctrlWrapper(ctrl.addContact));

router.delete("/:id", isValidId, ctrlWrapper(ctrl.removeContact));

router.put(
  "/:id",
  isValidId,
  validateContact,
  validation(schemas.addSchema),
  ctrlWrapper(ctrl.updateContact)
);

router.patch(
  "/:id/favorite",
  isValidId,
  validateContact,
  validationFavorite,
  validation(schemas.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;


