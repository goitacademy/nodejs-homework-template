const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../../middlewares");

const contactsController = require("../../controllers/contactsController");
const { contactsMiddleware } = require("../../middlewares");

router.use(authMiddleware.protect);

router.get("/", contactsController.getAllContacts);

router.get("/:contactId", contactsMiddleware.checkOwnerForContact, contactsController.getContactById); //

router.post("/", contactsMiddleware.checkAddContact, contactsController.postContact);

router.delete("/:contactId", contactsMiddleware.checkOwnerForContact, contactsController.deleteContacts); //

router.put("/:contactId", contactsMiddleware.checkOwnerForContact, contactsMiddleware.checkUpdateContact, contactsController.updateContact); //

router.patch("/:contactId/favorite", contactsMiddleware.checkOwnerForContact, contactsMiddleware.checkUpdateStatusContact, contactsController.updateStatusContact); //

module.exports = router;
