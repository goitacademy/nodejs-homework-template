const Joi = require('joi');
const { listContacts, getContactById, updateContact, removeContact, addContact } = require('../models/contacts.js');
const HttpError = require('../helpers/HttpError.js');

// const addSchema = Joi.object({
//     name: Joi.string().required(),
//     email: Joi.string().email().required(),
//     phone: Joi.string().required()
// });

const putSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string()
}).or("name", "email", "phone");

const addSchema = Joi.object({
    name: Joi.string()
        .required()
        .messages({
            'any.required': `Missing required name field`,
        }),
    phone: Joi.string()
        .required()
        .messages({
            'any.required': `Missing required phone field`,
        }),
    email: Joi.string()
        .required()
        .messages({
            'any.required': `Missing required email field`,
        }),
})

const getAll = async (req, res, next) => {
    try {
        const result = await listContacts();
        res.status(200).json(result)
    } catch (error) {
        next(error);
    }
};

const getById = async (req, res, next) => {
    try {
        const { contactId } = req.params
        const result = await getContactById(contactId);
        if (!result) {
            throw HttpError(404, "Not found")
        }
        res.status(200).json(result)
    } catch (error) {
        next(error);
    }
};

const postContact = async (req, res, next) => {
      try {
        const { error } = addSchema.validate(req.body)
        if (error) {
            throw HttpError(400, error.message)
        }
        const result = await addContact(req.body);
        res.status(201).json(result)
    } catch (error) {
        next(error);
    }
};

const deleteContact = async (req, res, next) => {
    try {
        const { contactId } = req.params
        const result = await removeContact(contactId);
        if (!result) {
            throw HttpError(404, "Not found")
        }
        res.status(200).json({
            message: 'Contact deleted'
        })
    } catch (error) {
        next(error);
    }
};

const putContact = async (req, res, next) => {
    try {
        const { error } = putSchema.validate(req.body)
        if (error) {
            throw HttpError(400, "Missing fields")
        }
        const { contactId } = req.params;
        const result = await updateContact(contactId, req.body);
        if (!result) {
            throw HttpError(404, "Not found")
        }
        res.status(200).json(result)
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAll,
    getById,
    postContact,
    deleteContact,
    putContact
}