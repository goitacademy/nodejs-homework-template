const express = require("express");
const {
  validationConstructor,
  controllerWrapper,
  isValidId,
} = require("../../middlewares");
const { schemas } = require("../../models/contact");
const { contactsControllers } = require("../../controllers");

const router = express.Router();
const { getAll, getById, add, updateById, removeById, updateFavorite } =
  contactsControllers;

router.get("/", controllerWrapper(getAll));

router.get("/:contactId", isValidId, controllerWrapper(getById));

router.post(
  "/",
  validationConstructor(schemas.addSchema),
  controllerWrapper(add)
);

router.delete("/:contactId", isValidId, controllerWrapper(removeById));

router.put(
  "/:contactId",
  isValidId,
  validationConstructor(schemas.addSchema),
  controllerWrapper(updateById)
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validationConstructor(schemas.updateFavoriteSchema),
  controllerWrapper(updateFavorite)
);

module.exports = router;
