const express = require("express");
const controllers = require("../../controllers/contacts");
const { schemas } = require("../../models/contact");
const {
  controllerWrapper,
  validation,
  isValidId,
  authenticate,
} = require("../../helpers");
const router = express.Router();

router.get("/", authenticate, controllerWrapper(controllers.getAll));

router.get(
  "/:contactId",
  authenticate,
  isValidId,
  controllerWrapper(controllers.getById)
);

router.post(
  "/",
  authenticate,
  validation(schemas.joiSchemaAll),
  controllerWrapper(controllers.add)
);

router.delete(
  "/:contactId",
  authenticate,
  controllerWrapper(controllers.removeById)
);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validation(schemas.joiSchemaAll),
  controllerWrapper(controllers.updateById)
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validation(schemas.joiSchemaFavorite),
  controllerWrapper(controllers.updateStatusContact)
);

module.exports = router;
