const express = require("express");

const {
  validation,
  validationFavorite,
  ctrlWrapper,
  isValidId,
} = require("../../middlewares");
const { addContactSchema, updateContactSchema } = require("../../schemas");
const { contacts: ctrl } = require("../../controllers");

const validateMiddlewareAdd = validation(addContactSchema);
 const validateMiddlewareUpdate = validationFavorite(updateContactSchema);

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", isValidId, ctrlWrapper(ctrl.getById));

router.post("/", validateMiddlewareAdd, ctrlWrapper(ctrl.add));

router.delete("/:contactId", isValidId, ctrlWrapper(ctrl.removeById));

router.put(
  "/:contactId",
  isValidId,
   validateMiddlewareAdd,
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateMiddlewareUpdate,
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;
