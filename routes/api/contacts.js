const express = require("express");
const { validation, ctrlWrapper } = require("../../middlewares");
const { schemas } = require("../../models");
const ctrl = require("../../controllers");
const router = express.Router();
const {
  addContact,
  getAll,
  getContactById,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers");

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getContactById));

router.post(
  "/",
  validation(schemas.contactAddSchema),
  ctrlWrapper(ctrl.addContact)
);

router.put(
  "/:contactId",
  validation(schemas.contactUpdateSchema),
  ctrlWrapper(ctrl.updateContact)
);

router.patch(
  "/:id/favorite",
  validation(schemas.updateFavorite),
  ctrlWrapper(ctrl.updateStatusContact)
);

router.delete("/:contactId", ctrlWrapper(ctrl.removeContact));

module.exports = router;
