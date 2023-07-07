const express = require("express");

const { controllerWrapper } = require("../../helpers");
const contactsController = require("../../controllers/contacts");

const { validateBody, isValidId, auth } = require("../../middlewares");
const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", auth, controllerWrapper(contactsController.listContacts));

router.get(
  "/:contactId",
  auth,
  isValidId,
  controllerWrapper(contactsController.getContactById)
);

router.post(
  "/",
  auth,
  validateBody(schemas.addSchema),
  controllerWrapper(contactsController.addContact)
);

router.delete(
  "/:contactId",
  auth,
  isValidId,
  controllerWrapper(contactsController.removeContact)
);

router.put(
  "/:contactId",
  auth,
  isValidId,
  validateBody(schemas.addSchema),
  controllerWrapper(contactsController.updateContact)
);
router.patch(
  "/:contactId/favorite",
  auth,
  isValidId,
  validateBody(schemas.favoriteSchema),
  controllerWrapper(contactsController.updateStatusContact)
);

module.exports = router;
