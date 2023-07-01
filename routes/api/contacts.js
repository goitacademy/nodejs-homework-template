const express = require("express");

const { controllerWrapper } = require("../../helpers");
const contactsController = require("../../controllers/contacts");

const { validateBody, isValidId } = require("../../middlewares");
const { schemes } = require("../../models/contact");

const router = express.Router();

router.get("/", controllerWrapper(contactsController.listContacts));

router.get(
  "/:contactId",
  isValidId,
  controllerWrapper(contactsController.getContactById)
);

router.post(
  "/",
  validateBody(schemes.addSchema),
  controllerWrapper(contactsController.addContact)
);

router.delete(
  "/:contactId",
  isValidId,
  controllerWrapper(contactsController.removeContact)
);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemes.addSchema),
  controllerWrapper(contactsController.updateContact)
);
router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemes.favoriteSchema),
  controllerWrapper(contactsController.updateStatusContact)
);

module.exports = router;
