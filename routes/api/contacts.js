const express = require("express");

const router = express.Router();

const { contacts: ctrl } = require("../../controllers");

const { ctrlWrapper } = require("../../helpers");

const { validation, isValidId, authentificate } = require("../../middlewares");

const { schemas } = require("../../models/contact");

router.get("/", authentificate, ctrlWrapper(ctrl.getAll));

router.get("/:contactId", authentificate, isValidId,  ctrlWrapper(ctrl.getContactById));

router.post("/", authentificate, validation(schemas.addSchema), ctrlWrapper(ctrl.addContacts));

router.delete("/:contactId",authentificate, ctrlWrapper(ctrl.deleteContact));

router.put(
  "/:contactId",
  authentificate,
  validation(schemas.addSchema),
  ctrlWrapper(ctrl.updateContact)
);

router.patch(
  "/:contactId/favorite",
  authentificate,
  isValidId,
  validation(schemas.updateFavoriteSchema),
  ctrlWrapper(ctrl.patchFavorite)
);
module.exports = router;
