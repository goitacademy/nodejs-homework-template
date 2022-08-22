const express = require("express");
const { addValidation, updateValidation } = require("../../middlewares/middlewaresapi");
const router = express.Router();
const {
    getAllContacts,
    getOneContact,
    addContact,
    deletContact,
    updateContact,
} = require("../../controllers/contact/contact");

router.get("/", getAllContacts);

router.get("/:contactId", getOneContact);

// add contact
router.post("/", addValidation, addContact);

router.delete("/:contactId", deletContact);

router.put("/:contactId", updateValidation, updateContact);

module.exports = router;
