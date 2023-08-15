const Joi = require('joi');
const Contact = require('../service/schemas/contacts');

const getAllContacts = async (req, res, next) => {
    try {
        const contacts = await Contact.find();
        res.json({ contacts });
    } catch (error) {
        next(error);
    }
};

const getContactById = async (req, res, next) => {
    try {
        const contact = await Contact.findById(req.params.contactId);
        if (!contact) {
            return res.status(404).json({ message: 'Not found' });
        }
        res.json({ contact });
    } catch (error) {
        next(error);
    }
};

const createContact = async (req, res, next) => {
    try {
        const schema = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email(),
            phone: Joi.string(),
            favorite: Joi.boolean(),
        });

        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const newContact = await Contact.create(req.body);
        res.status(201).json({ newContact });
    } catch (error) {
        next(error);
    }
};

const updateContact = async (req, res, next) => {
    try {
        const updatedContact = await Contact.findByIdAndUpdate(
            req.params.contactId,
            req.body,
            { new: true }
        );
        if (!updatedContact) {
            return res.status(404).json({ message: 'Not found' });
        }
        res.json({ updatedContact });
    } catch (error) {
        next(error);
    }
};

const deleteContact = async (req, res, next) => {
    try {
        const deletedContact = await Contact.findByIdAndDelete(
            req.params.contactId
        );
        if (!deletedContact) {
            return res.status(404).json({ message: 'Not found' });
        }
        res.json({ deletedContact });
    } catch (error) {
        next(error);
    }
};

const updateStatusContact = async (req, res, next) => {
    try {
        const updatedContact = await Contact.findByIdAndUpdate(
            req.params.contactId,
            { favorite: req.body.favorite },
            { new: true }
        );
        if (!updatedContact) {
            return res.status(404).json({ message: 'Not found' });
        }
        res.json({ updatedContact });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact,
    updateStatusContact,
};

