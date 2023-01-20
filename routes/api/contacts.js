const express = require("express");

const controller = require("../../controllers/contacts");
const { controllerWrapper } = require("../../helpers");
const { validateBody, isValidId, authenticate } = require("../../middlevares");
const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", authenticate, controllerWrapper(controller.getAll));
router.get(
  "/:contactId",
  authenticate,
  isValidId,
  controllerWrapper(controller.getById)
);
router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema),
  controllerWrapper(controller.add)
);
router.delete(
  "/:contactId",
  authenticate,
  isValidId,
  controllerWrapper(controller.removeById)
);
router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(schemas.addSchema),
  controllerWrapper(controller.updateById)
);
router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  controllerWrapper(controller.updateStatusContact)
);

module.exports = router;