const express = require("express");
const ContactsController = require("../../controllers/ContactsController");
const authenticate = require("../../middlewares/authenticate");
const validateId = require("../../middlewares/validateId");
const validateBody = require("../../middlewares/validateBody");
const contactsJoiSchema = require("../../schemas/contactsJoiSchema")
const router = express.Router();

router.get("/", authenticate, ContactsController.getAllContacts);

router.get(
  "/:contactId",
  authenticate,
  validateId,
  ContactsController.getOneContact
);

router.post(
  "/",
  authenticate,
  validateBody(contactsJoiSchema),
  ContactsController.createContact
);

router.delete(
  "/:contactId",
  authenticate,
  validateId,
  ContactsController.deleteContact
);

router.put(
  "/:contactId",
  authenticate,
  validateId,
  ContactsController.updateContact
);
router.patch(
  "/:contactId/favorite",
  validateId,
  ContactsController.updateStatusContact
);

module.exports = router;
