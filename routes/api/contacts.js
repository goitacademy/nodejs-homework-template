const express = require("express");
const { contacts: ctrl } = require("../../controllers");
const { ctrlWrapper } = require("../../helpers");
const { auth, validation, isValidId } = require("../../middlewares");
const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.listContacts));

router.get("/:id", isValidId, ctrlWrapper(ctrl.getById));

router.post(
  "/",
  auth,
  validation(schemas.contactsAddSchema),
  ctrlWrapper(ctrl.addContact)
);

router.delete("/:id", isValidId, ctrlWrapper(ctrl.removeContact));

router.put(
  "/:id",
  isValidId,
  validation(schemas.contactsAddSchema),
  ctrlWrapper(ctrl.updateContact)
);

router.patch(
  "/:id/favorite",
  isValidId,
  validation(schemas.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;
