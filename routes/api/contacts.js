const express = require("express");

const router = express.Router();

const { contacts: ctrl } = require("../../controllers");

const { ctrlWrapper } = require("../../helpers");

const { validation, isValidId } = require("../../middlewares");

const { schemas } = require("../../models/contact");

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", isValidId, ctrlWrapper(ctrl.getContactById));

router.post("/", validation(schemas.addSchema), ctrlWrapper(ctrl.addContacts));

router.delete("/:contactId", ctrlWrapper(ctrl.deleteContact));

router.put(
  "/:contactId",
  validation(schemas.addSchema),
  ctrlWrapper(ctrl.updateContact)
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validation(schemas.updateFavoriteSchema),
  ctrlWrapper(ctrl.patchFavorite)
);
module.exports = router;
