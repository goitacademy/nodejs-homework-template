const express = require("express");

const controller = require("../../controllers/contacts");

const { controllerWrapper } = require("../../helpers");
const {
  validateIdParam,
  validateBody,
  authenticate,
} = require("../../middlewares");
const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", authenticate, controllerWrapper(controller.getAllContacts));

router.get(
  "/:contactId",
  authenticate,
  validateIdParam,
  controllerWrapper(controller.getContactById)
);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addContactSchema, "missing required fields"),
  controllerWrapper(controller.addContact)
);

router.delete(
  "/:contactId",
  authenticate,
  validateIdParam,
  controllerWrapper(controller.removeContactById)
);

router.put(
  "/:contactId",
  authenticate,
  validateIdParam,
  validateBody(schemas.updateContactSchema),

  controllerWrapper(controller.updateContactById)
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  validateIdParam,
  validateBody(schemas.updateFavoriteSchema),

  controllerWrapper(controller.updateFavorite)
);

module.exports = router;