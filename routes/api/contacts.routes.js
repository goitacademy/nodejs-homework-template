const express = require("express");
const router = express.Router();
const contactsController = require("../../controllers/contacts.controller");
const auth = require("../../middlewares/auth");

router.get("/", auth, contactsController.listContacts);
router.get("/:id", auth, contactsController.getContactById);
router.post("/", auth, contactsController.addContact);
router.put("/:id", auth, contactsController.updateContact);
router.patch("/:id/favorite", auth, contactsController.updateFavorite);
router.delete("/:id", auth, contactsController.removeContact);

module.exports = router;
