const express = require("express");

const router = express.Router();

const controller = require("../../controllers/contacts/index");

const { controllerWrapper } = require("../../helpers");

const { validateBody, isValidId } = require("../../middlewares");

const { schemas } = require("../../models/contacts");

router.get("/", controllerWrapper(controller.getAll));

router.get(
  "/:contactId",
  isValidId,
  controllerWrapper(controller.getContactById),
);

router.post(
  "/",
  validateBody(schemas.addSchema),
  controllerWrapper(controller.addContact),
);

router.delete(
  "/:contactId",
  isValidId,
  controllerWrapper(controller.removeContact),
);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.addSchema),
  controllerWrapper(controller.updateById),
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  controllerWrapper(controller.updateStatusContact),
);

module.exports = router;
