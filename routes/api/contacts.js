const express = require("express");
const {
  validationConstructor,
  controllerWrapper,
  isValidId,
  isAuth,
} = require("../../middlewares");
const { schemas } = require("../../models/contact");
const { contactsControllers, auth } = require("../../controllers");

const router = express.Router();
const { getAll, getById, add, updateById, removeById, updateFavorite } =
  contactsControllers;

router.get("/", isAuth, controllerWrapper(getAll));

router.get("/:contactId", isValidId, controllerWrapper(getById));

router.post(
  "/",
  isAuth,
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
