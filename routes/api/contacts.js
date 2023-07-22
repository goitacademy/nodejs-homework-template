const express = require("express");
const router = express.Router();
const contactControllers = require("../../controllers/contactsControlers");
const isValidId =require("../../middlewares/isValid")
const ValidBody = require("../../middlewares/validBody")

router.get("/", contactControllers.getContacts);

router.get("/:contactId",isValidId, contactControllers.getContactById);

router.post("/", ValidBody.ValidFullContact, contactControllers.addContact);

router.delete("/:contactId",isValidId, contactControllers.deleteContatcById);

router.put("/:contactId",isValidId, ValidBody.ValidFullContact, contactControllers.updateContact);

router.patch("/:contactId/favorite",isValidId, ValidBody.ValidFavorite, contactControllers.updateStatusContact);

module.exports = router;
