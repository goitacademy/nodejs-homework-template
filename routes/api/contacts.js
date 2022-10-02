const express = require("express");
const { ctrlWrapper, validation, isValidId } = require("../../middlewares");
const { contacts: ctrl } = require("../../controllers");
const { schemas } = require("../../models/contacts");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", isValidId, ctrlWrapper(ctrl.getById));

router.post("/", validation(schemas.addSchema), ctrlWrapper(ctrl.add));

router.delete("/:contactId", isValidId, ctrlWrapper(ctrl.removeById));

router.put(
  "/:contactId",
  isValidId,
  validation(schemas.addSchema),
  ctrlWrapper(ctrl.changeById)
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validation(schemas.upadateFavoriteSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;
