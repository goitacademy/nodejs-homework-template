import contactsService from "../models/index.js"

import {HttpError} from "../helpers/HttpError.js"

import { contactAddSchema, contactUpdateSchema } from "../schemas/contact-schema.js";

const getAll = async (req, res, next) => {
    try {
        const result = await contactsService.listContacts();
        res.json(result);
        
    } catch (error) {
       next(error);
    }
  };

const getById = async (req, res, next) => {
    try {
        const {contactId} = req.params;
        const result = await contactsService.getContactById(contactId);
        if(!result) {
            return next(HttpError(404, "Not found"));
        }
        res.json(result);
    } catch (error) {
       next(error)
    }
};

const add = async (req, res, next) => {
    try {
        const {error} = contactAddSchema.validate(req.body);
        if(error) {
            return next(HttpError(400, error.message));
        }
        const result = await contactsService.addContact(req.body);
        res.status(201).json(result);
    } catch (error) {
        next(error)
    }
};

const updateContact = async (req, res, next) => {
    try {
        const {error} = contactUpdateSchema.validate(req.body);
        if(error) {
            return next(HttpError(400, "Missing fields"));
        }
        const {contactId} = req.params;
        const result = await contactsService.updateContactById(contactId, req.body);
        if(!result) {
            return next(HttpError(404, "Not found"));
        }
        res.json(result);

    } catch (error) {
        next(error)
    }
};

const deleteById = async (req, res, next) => {
     try {
        const {contactId} = req.params;
        const result = await contactsService.removeContact(contactId);
        if(!result) {
            return next(HttpError(404, "Not found"));
            }
        res.json({
            message: "contact deleted",
        })
     } catch (error) {
        next(error)
     }
}

export default {
    getAll,
    getById,
    add,
    updateContact,
    deleteById
}