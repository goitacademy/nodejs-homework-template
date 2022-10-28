const express = require("express");
const controller = require("../../controllers/contacts");
const { controllerWrapper } = require("../../helpers");
const { validateBody, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/contact");
const router = express.Router();

router.get("/", authenticate, controllerWrapper(controller.listContacts));

router.get(
  "/:contactId",
  authenticate,
  controllerWrapper(controller.getContactById)
);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema),
  controllerWrapper(controller.addContact)
);

router.delete(
  "/:contactId",
  authenticate,
  controllerWrapper(controller.removeContact)
);

router.put(
  "/:contactId",
  authenticate,
  validateBody(schemas.addSchema),
  controllerWrapper(controller.updateContact)
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  validateBody(schemas.updateFavoriteSchema),
  controllerWrapper(controller.updateFavorite)
);

module.exports = router;
