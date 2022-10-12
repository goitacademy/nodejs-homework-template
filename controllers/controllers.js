const contacts = require('../models/contacts');
const { RequestError } = require('../helpers/index');
const addSchema = require('../schemas/schemas');


const getListContacts = async (req, res, next) => {
    try {
        const result = await contacts.listContacts();
        res.json(result);
    } catch (error) {
        next(error);
    }
}

const getOneContact = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const result = await contacts.getContactById(contactId);
        if (!result) {
            throw RequestError(404, "Not found");
        }
        res.json(result);

    } catch (error) {
        next(error);
    }
}

const postContact = async (req, res, next) => {
    try {
        const { error } = addSchema.validate(req.body);
        if (error) {
            throw RequestError(400, "missing required name field");
        }
        const result = await contacts.addContact(req.body);
        res.status(201).json(result)
    } catch (error) {
        next(error);
    }
}

const deleteContacts = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const result = await contacts.removeContact(contactId);
        if (!result) {
            throw RequestError(404, "Not found")
        }
        res.status(200).json({
            "message": "contact deleted"
        })
    } catch (error) {
        next(error);
    }
}

const putContact = async (req, res, next) => {
    try {
        const { error } = addSchema.validate(req.body);
        if (error) {
            throw RequestError(400, "missing fields");
        }

        const { contactId } = req.params;
        const result = await contacts.updateContact(contactId, req.body);
        if (!result) {
            throw RequestError(404, "Not found")
        }
        res.json(result);
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getListContacts,
    getOneContact,
    postContact,
    deleteContacts,
    putContact
}