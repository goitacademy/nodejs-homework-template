const contacts = require('../models/contacts');
const  {httpError, ctrlWrapper } = require('../helpers');

const listContacts = async (_, res) => {
    const result = await contacts.listContacts();
    res.json(result);
};
const getContactById =  async (req, res) => {
    const { contactId } = req.params;

    const result = await contacts.getContactById(contactId);
    if (!result) {
        throw httpError(404, 'Not found');
    }
    return res.json(result);
};

const addContact = async (req, res) => {
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
};

const removeContact = async (req, res) => {
    const { contactId } = req.params;

    const result = await contacts.removeContact(contactId);
    if (!result) {
        throw httpError(404, 'Not found');
    }
    res.json({
        message: 'contact deleted',
    });
};

const updateContact = async (req, res) => {
    const { contactId } = req.params;

    const result = await contacts.updateContact(contactId, req.body);

    if (!result) {
        throw httpError(404, 'Not found');
    }
    return res.json(result);
};

module.exports = {
    listContacts: ctrlWrapper(listContacts),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    removeContact: ctrlWrapper(removeContact),
    updateContact: ctrlWrapper(updateContact),
};
