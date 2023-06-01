const express = require('express');

const contactsController = require("../../controllers/contacts-controllers");

const { isValidId } = require("../../middleware/isValidId");

const router = express.Router();


router.get("/", contactsController.getAllContacts);

router.get("/:id",isValidId, contactsController.getContactById);

router.post("/", contactsController.addContact);

router.delete("/:id", isValidId, contactsController.removeContactById);

router.put("/:id", isValidId, contactsController.updateContactById);

router.patch("/:id/favorite", isValidId, contactsController.updateFavorite);

module.exports = router;
