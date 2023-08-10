const { HttpError } = require('../helpers')
const contact = require('../models/contacts')

const getAll = async (req, res, next) => {
    try {
        const result = await contact.listContacts();
        res.json(result)
    } catch (error) {
        next(error)
    }
}

const getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await contact.getContactById(id);
        if (!result) {
            throw HttpError(404, "Not found")
        }
        res.json(result)
    } catch (error) {
        next(error)
    }
}

const addContact = async (req, res, next) => {
    try {
        const result = await contact.addContact(req.body);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
}

const removeContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = contact.removeContact(id);
        if (!result) {
            throw HttpError(404, "Not found")
        }
        res.json({
            message: "contact deleted"
        })
    } catch (error) {
        next(error)
    }
}

const updateContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await contact.updateContact(id, req.body);
        if (!result) {
            throw HttpError(404, "Not found")
        }
        res.json(result)
    } catch (error) {
        next(error);
    }
}



module.exports = {
    getAll,
    getById,
    addContact,
    removeContact,
    updateContact,
}