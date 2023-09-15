const contacts = require("../models/contacts");
const { HttpError, ctrlWrapper } = require("../helpers");

const listContacts = async (req, res) => {
    const allContacts = await contacts.listContacts();
    res.json(allContacts);
};

const getContactById = async (req, res) => {
    const { contactId } = req.params;
    const contactById = await contacts.getContactById(contactId);
    if (!contactById) {
        throw HttpError(404, "Not found");
    }
    res.json(contactById);
};

const removeContact = async (req, res) => {
    const { contactId } = req.params;
    const delContact = await contacts.removeContact(contactId);
    if (!delContact) {
        throw HttpError(404, "Not found");
    }
    res.json({
        message: "Delete susses"
    });
};

const addContact = async (req, res) => {
    const newContact = await contacts.addContact(req.body);
    res.status(201).json(newContact);
};

const updateContact = async (req, res) => {
    const { contactId } = req.params;
    const updContact = await contacts.updateContact(contactId, req.body);
    if (!updContact) {
        throw HttpError(404, "Not found");
    }
    res.json(updContact);
};

module.exports = {
    listContacts: ctrlWrapper(listContacts),
    getContactById: ctrlWrapper(getContactById),
    removeContact: ctrlWrapper(removeContact),
    addContact: ctrlWrapper(addContact),
    updateContact: ctrlWrapper(updateContact),
}