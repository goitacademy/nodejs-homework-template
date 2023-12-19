import * as serviceContacts from "./models/contacts.js";
import HttpError from "./helpers/HttpError.js";
import { contactsAddSchema, contactUpdateSchema } from "./schemas/contacts-schemas.js";



const getAll = async (req, res, next) => {
    try {
        const result = await serviceContacts.listContacts();
        res.json(result);
    } catch (error) {
        next(error);
    }
};

const getById = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const result = await serviceContacts.getContactById(contactId); 
        if (!result) {
            throw HttpError(404, `Contact with id=${contactId} is not found`)
        };
        res.json(result);
    } catch (error) {
        next();
    }
};

const add = async (req, res, next) => {
    try {
        const { error } = contactsAddSchema.validate(req.body);
        console.log(error)
        if (error) {
            throw HttpError(404, 'missing required name field');
        }
        const result = await serviceContacts.addContact(req.body);
        res.status(201).json(result);
    }
    catch (error) {
        next(error);
    };
};

const removeContact = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const result = await serviceContacts.removeContact(contactId);
        if (!result) {
            throw HttpError(404, `Contact with id=${contactId} is not found`)
        };
        res.json({ message: "contact deleted" });
    
    } catch (error) {
        next();
    }
};

const updateById = async (req, res, next) => { 
    try {
        const { error } = contactUpdateSchema.validate(req.body);
        if (error) { 
            throw HttpError(400, error.message);
        }
        const { contactId } = req.params;
        const result = await serviceContacts.updateContact(contactId, req.body);
        if (!result) {
            throw HttpError(404, `Contact with id=${contactId} is not found`);
        }
        res.json(result);
        
    } catch (error) {
        next(error);
    }
}

export default {
    getAll,
    getById,
    add,
    removeContact,
    updateById,
};