const express = require("express");
const { addValidation, updateValidation, validationFavorite } = require("../middlewares/middlewaresapi.js");
const router = express.Router();
const {
    getAllContacts,
    getOneContact,
    addContact,
    deletContact,
    updateContact,
    updateFavorite,
} = require("../../controllers/contacts/contacts");

router.get("/", getAllContacts);

router.get("/:contactId", getOneContact);

// add contact
router.post("/", addValidation, addContact);

router.delete("/:contactId", deletContact);

router.put("/:contactId", updateValidation, updateContact);

router.patch("/:contactId", validationFavorite, updateFavorite);

module.exports = router;
