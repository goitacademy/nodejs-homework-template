import * as contactsService from "../models/index.js";
import Joi from "joi";

import { HttpError } from "../helpers/index.js";

const contactAddSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
})

const getListContacts = async (req, res) => {
    try {
        const result = await contactsService.getListContacts();
        res.json(result);
    }
    catch (error) {
        next(error);
    }
};

const getContactById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await contactsService.getContactById(id);
        if (!result) {
            throw HttpError(404, `Contact with id=${id} was not found`);
        };
        res.json(result);
    }
    catch (error) {
        next(error);
    }
};

const addContact = async (req, res, next) => {
    try {
        const {error} = contactAddSchema.validate(req.body);
        if (error) {
            throw HttpError(400, error.message);
        }
        const result = await contactsService.addContact(req.body);
        res.status(201).json(result);
    }
    catch (error) {
        next(error);
    }
}

export default {
    getListContacts,
    getContactById,
    addContact,
}