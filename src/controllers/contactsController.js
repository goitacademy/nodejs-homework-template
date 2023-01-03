/// const contacts = require('../models/contacts');
const Contact = require('../models/contacts')
// const { HttpError } = require('../helpers');

const getContacts = async (req, res, next) => {
    try {
        const result = await Contact.find();
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

const getContactsById = async (req, res, next) => {
    try {
        /** const id = req.params.contactId;
         const result = await contacts.getContactById(id);
        if (!result) {
            throw HttpError(404);
        }
        res.json(result) */
    } catch (error) {
        next(error);
    }
}

const addContact = async (req, res, next) => {
    try {
        const {
            name,
            email,
            phone,
        } = req.body;

        const result = await Contact.create({ name, email, phone });
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
}

const deleteContact = async (req, res, next) => {
    try {
        /**
         *const id = req.params.contactId;
         const result = await contacts.removeContact(id);
        if (!result) {
            throw HttpError(404);
        }
        res.status(200).json({ message: "contact deleted" });
         */
    } catch (error) {
        next(error);
    }

}

const updateContactById = async (req, res, next) => {
    try {
        /**
         * const id = req.params.contactId;
         const { name, email, phone } = req.body;
        const result = await contacts.updateContact(id, { name, email, phone });
        res.status(200).json(result);
         */
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getContacts,
    getContactsById,
    addContact,
    deleteContact,
    updateContactById,
}