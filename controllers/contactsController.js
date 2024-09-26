const contacts = require('../models/contacts');
const {HttpError} = require('../helpers');
const {ctrlWrapper} = require('../decorators/ctrlWraper');

const getAll = async (req, res) => {
        const result = await contacts.listContacts();
        res.json(result);
}

const getById = async (req, res) => {
        const {contactId} = req.params;
        const result = await contacts.getContactById(contactId);
        if (!result) {
            throw HttpError (404, `Contact with ${contactId} not found`);
        }
        res.json(result);
}

const addContact = async (req, res) => {
        const result = await contacts.addContact(req.body);
        res.status(201).json(result);
}

const deleteContact = async (req, res) => {
        const {contactId} = req.params;
        const result = await contacts.removeContact(contactId);
        if (!result) {
            throw HttpError (404, `Contact with ${contactId} not found`);
        }
        res.json({"message": "contact deleted"});
}

const updateContact = async (req, res) => {
        const {contactId} = req.params;
        const result = await contacts.updateContact(contactId, req.body)
        if (!result) {
            throw HttpError (404, `Contact with ${contactId} not found`);
        }
        res.json(result);
}

module.exports = {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    addContact: ctrlWrapper(addContact),
    deleteContact: ctrlWrapper(deleteContact),
    updateContact: ctrlWrapper(updateContact)
}