const express = require("express");

const ctrl = require("../../controllers/contacts");

const { ctrlWrapper } = require("../../helpers");

const {
  validateBody,
  isValidId,
  validateFavoriteBody,
} = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", isValidId, ctrlWrapper(ctrl.getById));

router.post("/", validateBody(schemas.schema), ctrlWrapper(ctrl.add));

router.delete("/:contactId", isValidId, ctrlWrapper(ctrl.deleteById));

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateFavoriteBody(schemas.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.schema),
  ctrlWrapper(ctrl.updateById)
);

module.exports = router;
