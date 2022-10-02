const express = require("express");
const ctrl = require("../../controllers/contacts");
const router = express.Router();
const { ctrlWrapper } = require("../../helpers");
const { validateBody, isValidId } = require("../../middlewares");
const { schemas } = require("../../models/contact");

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", isValidId, ctrlWrapper(ctrl.getById));

router.post("/", validateBody(schemas.contactsSchema), ctrlWrapper(ctrl.add));

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.contactsSchema),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

router.delete("/:contactId", isValidId, ctrlWrapper(ctrl.deleteById));

module.exports = router;
