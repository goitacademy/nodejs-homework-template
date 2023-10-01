const contacts = require('../models/contacts');
const HttpError  = require('../helpers/HttpError');
const { ctrlWrapper } = require('../helpers');

const getAll = async (req, res ) => {
    const result = await contacts.getAll();
    res.status(200).json(result);
};

const getContactById = async ( req, res ) => {
    const {contactId} = req.params;
    const result = await contacts.getContactById(contactId);
    if(!result) {
        throw HttpError(404, 'Not Found');
    }
    res.status(200).json(result);
};

const addContact = async ( req, res ) => {
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
};

const updateContact = async ( req, res ) => {
    const {contactId} = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    if(!result) {
        throw HttpError(404, 'Not Found');
    }
    res.status(200).json(result);
};

const deleteContacts = async ( req, res ) => {
    const {contactId} = req.params;
    const result = await contacts.removeContact(contactId);
    if(!result) {
    throw HttpError(404, 'not Found');
    }
    res.status(200).json({
        message: "contact deleted"
    });
};

module.exports = {
    getAll: ctrlWrapper(getAll),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    updateContact: ctrlWrapper(updateContact),
    deleteContacts: ctrlWrapper(deleteContacts),
};

