import * as contactService from "../models/contacts.js";
import Joi from 'joi';

const contactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
});

const HttpError = (status, message) => {
    const error = new Error(message);
    error.status = status;
    return error;
}

const getAll = async (req, res, next) => {
    try {
        const result = await contactService.listContacts();
        res.json(result);
    }
    catch (error) {
        next(error);
    }
}

const getById = async (req, res, next) => {
    try {
        console.log(req.params);
        const { id } = req.params;
        const result = await contactService.getContactById(id);
        if (!result) {
            throw HttpError(404, `Movie with id=${id} not found`);
        }
        res.json(result);
    }
    catch (error) {
        next(error);
    }
}

const deleteById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await contactService.removeContact(id);
        if (!result) {
            throw HttpError(404, `Contact with id=${id} not found`);
        }

        res.json({
            message: "Delete success"
        })
    }
    catch (error) {
        next(error);
    }
}

const addContact = async (req, res, next) => {
    try {
        const { body } = req;

        const { error } = contactSchema.validate(body);

        if (error) {
            throw HttpError(400, `Mistake of validation: ${error.details[0].message}`);
        }

        const result = await contactService.addContact(body);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
}

const updateById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { body } = req;

        const { error } = contactSchema.validate(body);

        if (error) {
            throw HttpError(400, `Mistake of validation: ${error.details[0].message}`);
        }

        const result = await contactService.updateContact(id, body);

        if (!result) {
            throw new HttpError(404, `Contact with id=${id} not found`);
        }

        res.json(result);
    } catch (error) {
        next(error);
    }
}

export default {
    getAll,
    getById,
    deleteById,
    addContact,
    updateById,
}