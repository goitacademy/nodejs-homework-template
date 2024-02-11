const express = require("express");
const router = express.Router();

const { contactsController } = require("../../controllers");
const { contactModel } = require("../../models");
const {
  validateData,
  checkBody,
  isValidId,
  authenticate,
} = require("../../middlewares");

const { schemas } = contactModel;

router.get("/", authenticate, contactsController.getContacts);

router.get(
  "/:contactId",
  authenticate,
  isValidId,
  contactsController.getContact
);

router.post(
  "/",
  authenticate,
  checkBody,
  validateData(schemas.requiredFieldsSchema),
  contactsController.addContact
);

router.delete(
  "/:contactId",
  authenticate,
  isValidId,
  contactsController.deleteContact
);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  checkBody,
  validateData(schemas.requiredFieldsSchema),
  contactsController.updateContact
);


module.exports = router;