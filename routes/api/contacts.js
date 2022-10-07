const express = require("express");

const { contacts: ctrl } = require("../../controllers");

const { validation, isValidId, ctrlWrapper } = require("../../middlewares");
const { schemas } = require("../../models/contacts/contact");

const validationMiddleware = validation(schemas.addSchema);
const favValidationMiddleware = validation(schemas.updateFavouriteSchema);

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.listAll));

router.get("/:contactId", isValidId, ctrlWrapper(ctrl.getById));

router.post("/", validationMiddleware, ctrlWrapper(ctrl.add));

router.delete("/:contactId", isValidId, ctrlWrapper(ctrl.removeById));

router.put(
  "/:contactId",
  isValidId,
  validationMiddleware,
  ctrlWrapper(ctrl.updateById)
);

router.put(
  "/:contactId/favorite",
  isValidId,
  favValidationMiddleware,
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;
