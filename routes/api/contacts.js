const express = require("express");
const { contacts: ctrl } = require("../../controllers/index");
const router = express.Router();

const { validation, isValidId } = require("../../middlewares/index");
const { ctrlWrapper } = require("../../helpers/index");
const { schemas } = require("../../models/contact");

router.get("/", ctrlWrapper(ctrl.listContact));

router.get("/:contactId", isValidId, ctrlWrapper(ctrl.getContactById));

router.post("/", validation(schemas.addSchema), ctrlWrapper(ctrl.addContact));

router.put(
  "/:contactId",
  isValidId,
  validation(schemas.addSchema),
  ctrlWrapper(ctrl.updateContact)
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validation(schemas.favoriteSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

router.delete("/:contactId", isValidId, ctrlWrapper(ctrl.removeContact));

module.exports = router;
