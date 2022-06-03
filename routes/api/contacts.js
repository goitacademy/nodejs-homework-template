const express = require("express");
const contactsDB = require("../../models/contacts");
const { addValidation, updateValidation } = require("../middlewares/middlewaresapi.js");

const router = express.Router();

router.get("/", async (req, res, next) => {
    const allContacts = await contactsDB.listContacts();
    res.status(200).json({ message: "status 200", response: allContacts });
});

router.get("/:contactId", async (req, res, next) => {
    const contactByID = await contactsDB.getContactById(req.params.contactId);
    if (!contactByID) {
        res.status(404).json({ message: "status 404", response: contactByID });
        throw new Error(`Contact ${req.params.contactId} not found`);
    }
    res.status(200).json({ message: "status 200", response: contactByID });
});

// add contact
router.post("/", addValidation, async (req, res, next) => {
    const newContact = await contactsDB(req.body);
    if (!newContact) {
        res.status(404).json({ message: "status 404", response: newContact });
        throw new Error(`Contact not created, i am sorry try again`);
    }
    res.status(200).json({ message: "status 200", response: newContact });
});

router.delete("/:contactId", async (req, res, next) => {
    const removeContact = await contactsDB.removeContact(req.params.contactId);
    if (!removeContact) {
        res.status(404).json({ message: "status 404", response: removeContact });
        throw new Error(`Contact ${req.params.contactId} not found`);
    }
    res.status(204).json({ message: "status 204", response: removeContact });
});

router.put("/:contactId", updateValidation, async (req, res, next) => {
    const editContact = await contactsDB(req.params.contactId, req.body);
    if (!editContact) {
        res.status(404).json({ message: "status 404", response: editContact });
        throw new Error(`Contact ${req.params.contactId} not found`);
    }
    res.status(200).json({ message: "status 200", response: editContact });
});

module.exports = router;
