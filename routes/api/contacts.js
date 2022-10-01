const express = require("express");

const controller = require("../../controllers/contacts/index");

const { controllerWrapper } = require("../../helpers");

const { validateBody, isValidId } = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", controllerWrapper(controller.listContacts));

router.get(
  "/:contactId",
  isValidId,
  controllerWrapper(controller.getContactById)
);

router.post(
  "/",
  validateBody(schemas.contactsSchema),
  controllerWrapper(controller.addContact)
);

router.delete(
  "/:contactId",
  isValidId,
  controllerWrapper(controller.removeContact)
);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.contactsSchema),
  controllerWrapper(controller.updateContact)
);
router.patch(
  ":contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  controllerWrapper(controller.updateFavorite)
);

module.exports = router;
