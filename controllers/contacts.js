const contactsAPI = require('../models/contacts');
const { HttpErrors, ctrlWrapper } = require('../helpers');

const getAll = async (req, res, next) => {
    const contacts = await contactsAPI.listContacts()
    res.json(contacts)
};

const getById = async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await contactsAPI.getContactById(contactId);
    if (!contact) {
        throw HttpErrors(404, 'Not Found')
    }
    res.json(contact)
};

const add = async (req, res, next) => {
    const contact = await contactsAPI.addContact(req.body)
    res.status(201).json(contact)
};

const updateById = async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await contactsAPI.updateContact(contactId, req.body);
    if (!contact) {
        throw HttpErrors(404, 'Not found')
    };
    res.json(contact);
};

const updateStatusById = async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await contactsAPI.updateStatusContact(contactId, req.body);
    if (!contact) {
        throw HttpErrors(404, 'Not found')
    };
    res.json(contact);
};

const deleteById = async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await contactsAPI.removeContact(contactId);
    if (!contact) {
        throw HttpErrors(404, 'Not Found')
    }
    res.json({ message: "contact deleted" });
};

module.exports = {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
    updateById: ctrlWrapper(updateById),
    updateStatusById: ctrlWrapper(updateStatusById),
    deleteById: ctrlWrapper(deleteById),
};