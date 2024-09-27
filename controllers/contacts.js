const contacts = require('../models/contacts');
const { HttpError } = require('../helpers/HttpError');
const { ctrlWrapper } = require('../helpers/ctrlWrapper');

const getAll = async (req, res) => {
    const result = await contacts.listContacts();
    res.json(result);
};

const getContactsById = async (req, res) => {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
        throw HttpError(404, 'Not found');
    }
    res.json(result);
};

const add = async (req, res) => {
    const { name, email, phone } = req.body;
    const result = await contacts.addContact(name, email, phone);
    res.status(201).json(result);
};

const deleteContacts = async (req, res) => {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);

    if (!result) {
        throw HttpError(404, 'Not found');
    }
    res.status(200).json({ message: 'Contact deleted' });
};

const update = async (req, res) => {
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    if (!result) {
        throw HttpError(404, 'Not found');
    }
    res.status(200).json(result);
};

module.exports = {
    getAll: ctrlWrapper(getAll),
    getContactsById: ctrlWrapper(getContactsById),
    add: ctrlWrapper(add),
    deleteContacts: ctrlWrapper(deleteContacts),
    update: ctrlWrapper(update),
};