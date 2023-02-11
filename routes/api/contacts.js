const express = require("express");
const contactController = require("./contacts.controllers");

const router = express.Router();

router.get("/", contactController.getAllContacts);

router.get(
  "/:contactId",
  contactController.validateUserID,
  contactController.getContact
);

router.post(
  "/",
  contactController.validateAddContact,
  contactController.addNewContact
);

router.delete(
  "/:contactId",
  contactController.validateUserID,
  contactController.removeContactById
);

router.put(
  "/:contactId",
  contactController.validateUpdateContactById,
  contactController.updateContactById
);

router.patch(
  "/:contactId/favorite",
  contactController.validateUserID,
  contactController.updateStatusContact
);

module.exports = router;
