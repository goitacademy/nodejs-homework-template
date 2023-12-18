import * as contactsService from "../models/contacts.js";
import HttpError from "../helpers/HttpError.js";
import { contactAddSchema, contactUpdateSchema } from "../schema/contacts-schema.js";

const getAll = async (req, res, next) => {
    try {
        const result = await contactsService.listContacts();

        res.json(result);
    }
    catch (error) {
        next(error)
    }
};

const getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await contactsService.getContactById(id);
        if (!result) {
            throw HttpError(404, `Contact with id=${id} not found`);
        }
      res.json(result)  
    }
     catch (error) {
        next(error)
    }
    }
    
const addContact = async (req, res, next) => {
    try {
        const { error } = contactAddSchema.validate(req.body);
        if (error) {
            throw HttpError(400, error.message);
        }
        const result = await contactsService.addContact(req.body);
        res.status(201).json(result)
    }
    catch (error) {
        next(error)
    }
};

const deleteContact = async (req, res, next) => {
        try {
        const { id } = req.params;
        const result = await contactsService.removeContact(id);
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

const updateById = async (req, res, next) => {
    try {
        const { error } = contactUpdateSchema.validate(req.body);
        if (error) {
            throw HttpError(400, error.message);
        }
        const { id } = req.params;
        const result = await contactsService.updateContact(id, req.body);
        if (!result) {
            throw HttpError(404, `Contact with id=${id} not found`);
        }
        res.json(result);
    }
    catch (error) {
        next(error);
    }
}

export default {
    getAll,
    getById,
    addContact,
    deleteContact,
    updateById
}