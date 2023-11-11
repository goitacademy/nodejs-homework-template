import * as contactsService from "../models/contacts.js";

import { HttpError } from "../helpers/index.js";

import { contactAddSchema, contactUpdateSchema } from "../schemas/contact-schemas.js";

const listContactsById = async (req, res) => {
    try {
        const result = await contactsService.listContacts();
        res.json(result);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
}

const getById = async (req, res, next) => {
    try {
        const result = await contactsService.getContactById(req.params.contactId);
        if (!result) {
            throw HttpError(404, 'Not found');
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
}

const addContactById = async (req, res, next) => {
    try {
        const {error} = contactAddSchema.validate(req.body);
        if (error) {
            throw HttpError(400, 'missing required name field' );
        }
        const newContact = await contactsService.addContact(req.body);
        res.status(201).json(newContact);
    } catch (error) {
        next(error);
    }
}

const removeContactById = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const result = await contactsService.removeContact(contactId);
        if (!result) {
            throw HttpError(404, 'Not found');
        }

        res.json({
            message: 'contact deleted'
        });
    } catch (error) {
        next(error);
    }
}

const updateContactById = async (req, res, next) => {
    try {
        const {error} = contactUpdateSchema.validate(req.body);
        if (error) {
            throw HttpError(400, 'missing fields' );
        }
        const { contactId } = req.params;
        const result = await contactsService.updateContact(contactId, req.body);
        if (!result) {
            throw HttpError(404, 'Not found');
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
}

export default {
    listContactsById,
    getById,
    removeContactById,
    addContactById,
    updateContactById,
}