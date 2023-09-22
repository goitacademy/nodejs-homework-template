const contactsAPI = require('../models/contacts');
const { HttpErrors, ctrWrapper } = require('../helpers');

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

const deleteById = async (req, res, next) => {
        const { contactId } = req.params;
        const contact = await contactsAPI.removeContact(contactId);
        if (!contact) {
            throw HttpErrors(404, 'Not Found')
        }
        res.json({ message: "contact deleted" });
};

module.exports = {
    getAll: ctrWrapper(getAll),
    getById: ctrWrapper(getById),
    add: ctrWrapper(add),
    updateById: ctrWrapper(updateById),
    deleteById: ctrWrapper(deleteById),
}