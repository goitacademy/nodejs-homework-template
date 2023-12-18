import contactsService from "../models/contacts/index.js";
import { HttpError } from "../helpers/index.js";
import { contactAddSchema, contactUpdateSchema } from "../schemas/contact-schemas.js";


const getAll = async (req, res, next) => {
    try {
        const result = await contactsService.listContacts();

        res.json(result);

    } catch (error) {
        next(error);
    }
};

const getByID = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await contactsService.getContactById(id);

        if (!result) {
            throw HttpError(404, `Contact with id=${id} not found!`);
        };

        res.json(result);

    } catch (error) {
        next(error);
    }
};

const add = async (req, res, next) => {
    try {
        const { error } = contactAddSchema.validate(req.body);

        if (error) {
            throw HttpError(400, error.message);
        };

        const result = await contactsService.addContact(req.body);
        res.status(201).json(result);

    } catch (error) {
        next(error);
    }
};

const updateByID = async (req, res, next) => {
    try {
        const { error } = contactUpdateSchema.validate(req.body);
        const { id } = req.params;

        if (error) {
            throw HttpError(400, error.message);
        };

        const result = await contactsService.updateContact(id, req.body);
        
        if (!result) {
            throw HttpError(404, `Contact with id=${id} not found!`);
        };

        res.json(result);

    } catch (error) {
        next(error);
    }
};

const deleteById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await contactsService.removeContact(id);

        if (!result) {
            throw HttpError(404, `Contact with id=${id} not found!`);
        };

        res.json({ message: "Contact deleted" });
        
    } catch (error) {
        next(error);
    }
};

export default {
    getAll,
    getByID,
    add,
    updateByID,
    deleteById,
};