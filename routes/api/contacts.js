const express = require("express");

const {
  validateAddBody,
  validateUpdateBody,
  isValidId,
} = require("../../middlewares");
const { schemas } = require("../../models/contact");

const router = express.Router();

const ctrl = require("../../controllers/contacts");
const { ctrlWrapper } = require("../../helpers");

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", isValidId, ctrlWrapper(ctrl.getById));

router.post("/", validateAddBody(schemas.addSchema), ctrlWrapper(ctrl.add));

router.delete("/:contactId", isValidId, ctrlWrapper(ctrl.removeById));

router.put(
  "/:contactId",
  isValidId,
  validateUpdateBody(schemas.addSchema),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateUpdateBody(schemas.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;
