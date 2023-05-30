const express = require("express");
const router = express.Router();
const { contactsController } = require("../../controllers");
const { authenteficate } = require("../../middlewares");

router.use(authenteficate);

router.get("/", contactsController.getAllContacts);

router.get("/:contactId", contactsController.getContactById);

router.post("/", contactsController.createContact);

router.delete("/:contactId", contactsController.deleteContact);

router.put("/:contactId", contactsController.updateContact);

router.patch("/:contactId/favorite", contactsController.setFavorite);

module.exports = router;
