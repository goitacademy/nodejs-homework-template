const express = require("express");
const router = express.Router();

const contactsController = require("../../controllers");
const { validateData, checkBody } = require("../../helpers");

router.get("/", contactsController.getContacts);
router.get("/:contactId", contactsController.getContact);
router.post("/", validateData, contactsController.addContact);
router.delete("/:contactId", contactsController.deleteContact);
router.put(
    "/:contactId",
    checkBody,
    validateData,
    contactsController.updateContact
);

module.exports = router;