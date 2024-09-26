const express = require("express");
const router = express.Router();
const contactsController = require("../../controllers/contacts-controllers");
const authenticate = require("../../middlewares/authenticate");
const isValidId = require("../../middlewares/isValidId");
const { schemas } = require("../../models/contacts");
const { validateBody } = require("../../utils/validateBody");

router.use(authenticate);

router.get("/", contactsController.listContacts);

router.get("/:contactId", isValidId, contactsController.getContactById);

router.post(
  "/",
  validateBody(schemas.contactAddSchema),
  contactsController.addContact
);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.contactAddSchema),
  contactsController.updateContact
);

router.delete("/:contactId", isValidId, contactsController.removeContact);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.contactAddSchema),
  contactsController.updateStatusContact
);

module.exports = router;
