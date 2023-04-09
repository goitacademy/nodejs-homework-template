const {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContactById,
} = require('../../models/contacts');

const { contactSchema } = require('../../schemas/contacts');

const getAllContacts = async (req, res, next) => {
    try {
        const contacts = await listContacts();
        res.json(contacts);
    } catch (error) {
        next(error)
    }
};

const getContactInfoById = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const contact = await getContactById(contactId);
        if (!contact) {
            const error = new Error('Nothing found');
            error.code = 404;
            throw error;
        }
        res.status(200).json(contact);
    } catch (error) {
        next(error)
    }
};

const addNewContact = async (req, res, next) => {
    try {
        const { name, email, phone } = req.body;
        const { error } = contactSchema.validate({ name, email, phone });
        if (error) {
            const e = new Error(error.message);
            e.code = 400;
            throw e
        }
        const newContact = await addContact(name, email, phone);
        res.status(201).send(newContact);
    } catch (error) {
        next(error)
    }

};

const removeContactById = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const contact = await removeContact(contactId);
        if (!contact) {
            const error = new Error('Nothing found');
            error.code = 404;
            throw error;
        }
        res.status(204).send({ message: 'Contact remove' });
    } catch (error) {
        next(error)
    }
};

const updateInfoContactById = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const { name, email, phone } = req.body;
        const { error } = contactSchema.validate({ name, email, phone });
        if (error) {
            const e = new Error(error.message);
            e.code = 400;
            throw e
        }
        const contact = await updateContactById(contactId, { name, email, phone });
        if (!contact) {
            const error = new Error('Nothing found');
            error.code = 404;
            throw error;
        }
        res.status(200).json(contact);

    } catch (error) {
        next(error)
    }
};

module.exports = {
    getAllContacts,
    getContactInfoById,
    addNewContact,
    removeContactById,
    updateInfoContactById
};