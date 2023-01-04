const Contact = require('../models/contacts')
const { HttpError } = require('../helpers');

const getContacts = async (req, res, next) => {
    try {
        const result = await Contact.find({});
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

const getContactsById = async (req, res, next) => {
    try {
        const id = req.params.contactId;
        const result = await Contact.findById(id);
        if (!result) {
            throw HttpError(404);
        }
        res.json(result)
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

const updateContactById = async (req, res, next) => {
    try {
        const id = req.params.contactId;
        const { name, email, phone } = req.body;
        const result = await Contact.findByIdAndUpdate(id, { name, email, phone }, { new: true });
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

const updateFavorite = async (req, res, next) => {
    try {
        const id = req.params.contactId;
        // const { name, email, phone } = req.body;
        const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

const deleteContact = async (req, res, next) => {
    try {
        const id = req.params.contactId;
        const result = await Contact.findByIdAndRemove(id);
        if (!result) {
            throw HttpError(404);
        }
        res.status(200).json({ message: "contact deleted" });
    } catch (error) {
        next(error);
    }

}

module.exports = {
    getContacts,
    getContactsById,
    addContact,
    updateContactById,
    updateFavorite,
    deleteContact
}