const Contacts = require('../repository/contacts');
const { StatusCode } = require('../config/constants');

const SUCCESFUL_REQUEST = StatusCode.SUCCESFUL_REQUEST;
const NOT_FOUND = StatusCode.NOT_FOUND;
const CREATED = StatusCode.CREATED;
const BAD_REQUEST = StatusCode.BAD_REQUEST;

const getContacts = async (_req, res, next) => {
    try {
        const contacts = await Contacts.listContacts();
        return res.json({
            status: 'Success',
            code: SUCCESFUL_REQUEST,
            message: 'Contacts found',
            data: { contacts }
        });
    } catch (err) {
        next(err);
    };
};

const getContactById = async (req, res, next) => {
    try {
        const contact = await Contacts.getContactById(req.params.contactId);
        if (contact) {
            return res.json({
                status: 'Success',
                code: SUCCESFUL_REQUEST,
                message: 'Contact found',
                data: { contact }
            });
        } else {
            return res.status(NOT_FOUND).json({
                status: 'Error',
                code: NOT_FOUND,
                message: 'Not Found',
            });
        }
    } catch (err) {
        next(err);
    };
};

const addContact = async (req, res, next) => {
    try {
        const contact = await Contacts.addContact(req.body);
        return res.status(CREATED).json({
            status: 'Success',
            code: CREATED,
            message: 'Contact successfully created',
            data: { contact, },
        });
    } catch (err) {
        next(err);
    };
};

const removeContact = async (req, res, next) => {
    try {
        const contact = await Contacts.removeContact(req.params.contactId);
        if (contact) {
            return res.json({
                status: 'Success',
                code: SUCCESFUL_REQUEST,
                message: 'Contact deleted',
                data: { contact, },
            });
        } else {
            return res.status(NOT_FOUND).json({
                status: 'Error',
                code: NOT_FOUND,
                message: 'Not Found',
            });
        }
    } catch (err) {
        next(err);
    };
};

const updateContact = async (req, res, next) => {
    try {
        if (Object.keys(req.body).length === 0) {
            return res.status(BAD_REQUEST).json({
                status: 'Error',
                code: BAD_REQUEST,
                message: 'Bad request',
            });
        }
        const contact = await Contacts.updateContact(
            req.params.contactId,
            req.body,
        );
        if (contact) {
            return res.json({
                status: 'Success',
                code: SUCCESFUL_REQUEST,
                message: 'Contact updated successfully',
                data: { contact, },
            });
        } else {
            return res.status(NOT_FOUND).json({
                status: 'Error',
                code: NOT_FOUND,
                message: 'Not Found',
            });
        }
    } catch (err) {
        next(err);
    }
};

const updateStatusContact = async (req, res, next) => {
    try {
        const contact = await Contacts.updateContact(
            req.params.contactId,
            req.body,
        );
        if (contact) {
            return res.json({
                status: 'Success',
                code: SUCCESFUL_REQUEST,
                message: 'Contact updated successfully',
                data: { contact, },
            });
        } else {
            return res.status(NOT_FOUND).json({
                status: 'Error',
                code: NOT_FOUND,
                message: 'Not Found',
            });
        }
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact,
    updateStatusContact,
};