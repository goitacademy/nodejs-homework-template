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

router.get("/:contactId", isValidId, controllerWrapper(controllers.getById));

router.post(
  "/",
  authenticate,
  validation(schemas.joiSchemaAll),
  controllerWrapper(controllers.add)
);

router.delete("/:contactId", controllerWrapper(controllers.removeById));

router.put(
  "/:contactId",
  isValidId,
  validation(schemas.joiSchemaAll),
  controllerWrapper(controllers.updateById)
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validation(schemas.joiSchemaFavorite),
  controllerWrapper(controllers.updateStatusContact)
);

module.exports = router;
