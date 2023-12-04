const contacts = require('../models/contacts');
const { HttpError, ctrlWrapper } = require('../helpers');

const getAllContacts = async (_, res) => {
    const result = await contacts.listContacts();
    res.json(result);
};

const getContactById = async (req, res) => {
    const result = await contacts.getContactById(req.params.contactId);
    if (!result) throw HttpError(404, 'Not Found!');
    res.json(result);
};

const addContact = async (req, res) => {
    const result = await contacts.addContact(req.body);
    if (!result)
        throw HttpError(400, `${req.body.name} is already in contacts!`);
    res.status(201).json(result);
};

const removeContact = async (req, res) => {
    const result = await contacts.removeContact(req.params.contactId);
    if (!result) throw HttpError(404, 'Not Found!');
    res.json({ message: 'Contact deleted!' });
};

const updateContact = async (req, res) => {
    const result = await contacts.updateContact(req.params.contactId, req.body);
    if (!result) throw HttpError(404, 'Not Found!');
    res.json(result);
};

module.exports = {
    getAllContacts: ctrlWrapper(getAllContacts),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    removeContact: ctrlWrapper(removeContact),
    updateContact: ctrlWrapper(updateContact),
};
