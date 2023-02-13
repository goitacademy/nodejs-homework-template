const express = require("express");
const contactController = require("./contacts.controllers");

const router = express.Router();

router.get("/", contactController.getAllContacts);

router.get("/:contactId", contactController.getContact);

router.post(
  "/",
  contactController.validateAddContact,
  contactController.addNewContact
);

router.delete("/:contactId", contactController.removeContactById);

router.put(
  "/:contactId",
  contactController.validateUpdateContactById,
  contactController.updateContactById
);

module.exports = router;
