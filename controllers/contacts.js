const contactsOperations = require("../models/contacts");
const {HttpError,ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
    const result = await contactsOperations.listContacts();
    res.json(result)
};

const getById = async (req, res) => {
    const { contactId } = req.params;
    const result = await contactsOperations.getContactById(contactId);
    if (!result) throw HttpError(404, "Not found");
    res.json(result);
};

const addContact = async (req, res) => {
    const result = await contactsOperations.addContact(req.body);
    res.status(201).json(result);
};

const deleteContact = async (req, res) => {
    const { contactId } = req.params;
    const result = await contactsOperations.removeContact(contactId);
    if (!result) throw HttpError(404, "Not found");
    res.json({
        message: 'Contact deleted'
    });
};

const updateContact = async (req, res) => {
    const { contactId } = req.params;
    const result = await contactsOperations.updateContact(contactId, req.body);
    if (!result) throw HttpError(404, "Not found");
    res.json(result);
};

module.exports = {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    addContact: ctrlWrapper(addContact),
    deleteContact: ctrlWrapper(deleteContact),
    updateContact: ctrlWrapper(updateContact)
};