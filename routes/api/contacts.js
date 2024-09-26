const express = require("express");

const {
  validation,
  validationFavorite,
  ctrlWrapper,
  isValidId,
  authenticate,
} = require("../../middlewares");
const { addContactSchema, updateContactSchema } = require("../../models");
const { contacts: ctrl } = require("../../controllers");

const validateMiddlewareAdd = validation(addContactSchema);
const validateMiddlewareUpdate = validationFavorite(updateContactSchema);

const router = express.Router();

router.get("/", authenticate, ctrlWrapper(ctrl.getAll));

router.get("/:contactId", authenticate, isValidId, ctrlWrapper(ctrl.getById));

router.post("/", authenticate, validateMiddlewareAdd, ctrlWrapper(ctrl.add));

router.delete(
  "/:contactId",
  authenticate,
  isValidId,
  ctrlWrapper(ctrl.removeById)
);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateMiddlewareAdd,
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateMiddlewareUpdate,
  ctrlWrapper(ctrl.updateStatusContact)
);

router.get("/", authenticate, ctrlWrapper(ctrl.getContacts));

module.exports = router;
