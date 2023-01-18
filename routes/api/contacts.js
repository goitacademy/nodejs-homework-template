const express = require("express");

const controller = require("../../controllers/contacts");
const { controllerWrapper } = require("../../helpers");
const { validateBody, isValidId } = require("../../middlevares");
const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", controllerWrapper(controller.getAll));
router.get("/:contactId", isValidId, controllerWrapper(controller.getById));
router.post(
  "/",
  validateBody(schemas.addSchema),
  controllerWrapper(controller.add)
);
router.delete(
  "/:contactId",
  isValidId,
  controllerWrapper(controller.removeById)
);
router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.addSchema),
  controllerWrapper(controller.updateById)
);
router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  controllerWrapper(controller.updateStatusContact)
);

module.exports = router;