const contactsDB = require("../../models/contacts");

const getAllContacts = async (req, res, next) => {
    try {
        const allContacts = await contactsDB.listContacts();
        res.status(200).json({ message: "status 200", response: allContacts });
    } catch (error) {
        res.status(404).json({ message: `Contacts not found`, response: null });
    }
};

const getOneContact = async (req, res, next) => {
    try {
        const contactByID = await contactsDB.getContactById(req.params.contactId);
        res.status(200).json({ message: "status 200", response: contactByID });
    } catch (error) {
        res.status(404).json({ message: `Contact ${req.params.contactId} not found`, response: null });
    }
};

const addContact = async (req, res, next) => {
    try {
        const newContact = await contactsDB.addContact(req.body);
        res.status(200).json({ message: "status 200", response: newContact });
    } catch (error) {
        res.status(404).json({ message: "Contact not created, i am sorry try again", response: null });
    }
};

const deletContact = async (req, res, next) => {
    try {
        const removeContact = await contactsDB.removeContact(req.params.contactId);
        res.status(204).json({ message: "status 204", response: removeContact });
    } catch (error) {
        res.status(404).json({ message: `Contact ${req.params.contactId} not found`, response: null });
    }
};

const updateContact = async (req, res, next) => {
    try {
        const editContact = await contactsDB.updateContact(req.params.contactId, req.body);
        res.status(200).json({ message: "status 200", response: editContact });
    } catch (error) {
        res.status(404).json({ message: `Contact ${req.params.contactId} not found`, response: null });
    }
};

module.exports = { getAllContacts, getOneContact, addContact, deletContact, updateContact };
