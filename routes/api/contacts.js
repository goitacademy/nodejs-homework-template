const express = require("express");

const ctrl = require("../../controllers/contacts");

const { ctrlWrapper } = require("../../helpers");

const {
  validateBody,
  isValidId,
  validateFavoriteBody,
  authenticate,
} = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", authenticate, ctrlWrapper(ctrl.getAll));

router.get("/:contactId", authenticate, isValidId, ctrlWrapper(ctrl.getById));

router.post(
  "/",
  authenticate,
  validateBody(schemas.schema),
  ctrlWrapper(ctrl.add)
);

router.delete(
  "/:contactId",
  authenticate,
  isValidId,
  ctrlWrapper(ctrl.deleteById)
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateFavoriteBody(schemas.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(schemas.schema),
  ctrlWrapper(ctrl.updateById)
);

module.exports = router;
