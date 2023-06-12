const express = require("express");

const router = express.Router();

const contactsController = require("../../controllers/contactsController");

const { isValidId } = require("../../middlewares");

router.get("/", contactsController.getAllContacts);

router.get("/:id", isValidId, contactsController.getContactById);

router.post("/", contactsController.addContact);

router.delete("/:id", isValidId, contactsController.deleteContactById);

router.put("/:id", isValidId, contactsController.updateContactById);

router.patch("/:id/favorite", isValidId, contactsController.updateStatusContact);

module.exports = router;
