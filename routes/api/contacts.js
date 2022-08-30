const express = require("express");
const ctrl = require("../../controllers/contacts");
const { ctrlWrapper } = require("../../utils");
const {
  authenticate,
  validationBody,
  isValidId,
} = require("../../middlewares");
const { schemas } = require("../../models/contact");
const router = express.Router();

router.get("/", authenticate, ctrlWrapper(ctrl.getAll));

router.get("/:contactId", isValidId, ctrlWrapper(ctrl.getById));

router.post(
  "/",
  authenticate,
  validationBody(schemas.contactAddSchema),
  ctrlWrapper(ctrl.add)
);

router.put(
  "/:contactId",
  isValidId,
  validationBody(schemas.contactAddSchema),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validationBody(schemas.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

router.delete("/:contactId", ctrlWrapper(ctrl.removeById));

module.exports = router;
