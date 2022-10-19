const express = require("express");
const router = express.Router();
const ctrl = require("../../contollers/contacts");
const { ctrlWrapper } = require("../../helpers");
const { validateBody, isValidId } = require("../../middlewares");
const { schemas } = require("../../models/contact");

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", isValidId, ctrlWrapper(ctrl.getById));

router.post("/", validateBody(schemas.contactAddSchema), ctrlWrapper(ctrl.add));

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.contactAddSchema),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

router.delete("/:contactId", isValidId, ctrlWrapper(ctrl.removeById));

module.exports = router;
