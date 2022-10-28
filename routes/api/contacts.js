const express = require("express");

const router = express.Router();

const controller = require("../../controllers/contacts");

const { controllerWrapper } = require("../../helpers");

const { validateBody, isValidId, authenticate } = require("../../middlewares");

const { schemas } = require("../../models/contact");

router.get("/", authenticate, controllerWrapper(controller.getAll));

router.get(
  "/:contactId",
  authenticate,
  isValidId,
  controllerWrapper(controller.getContactById),
);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema),
  controllerWrapper(controller.addContact),
);

router.delete(
  "/:contactId",
  authenticate,
  isValidId,
  controllerWrapper(controller.removeContact),
);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(schemas.addSchema),
  controllerWrapper(controller.updateById),
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  controllerWrapper(controller.updateStatusContact),
);

module.exports = router;
