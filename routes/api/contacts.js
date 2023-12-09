const express = require("express");

const router = express.Router();

// const controllers = require("../../controllers/contacts");
const { ctrlWrapper } = require("../../helpers");

const { contacts: ctrl } = require("../../controllers");

const { validateBody, isValidId } = require("../../middlewares");

const schemas = require("../../schemas/contacts");

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", isValidId, ctrlWrapper(ctrl.getById));

router.post("/", validateBody(schemas.addSchema), ctrlWrapper(ctrl.add));

router.delete("/:contactId", isValidId, ctrlWrapper(ctrl.deleteById));

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.addSchema),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;
