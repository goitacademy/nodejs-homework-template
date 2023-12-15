import * as serviceContacts from "./models/contacts.js";
import HttpError from "./helpers/HttpError.js";

const getAll = async (req, res, next) => {
    try {
        const result = await serviceContacts.listContacts();
        res.json(result);
    } catch (error) {
        next(error)
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
        next(error)
    }
};

const add = async (req, res, next) => {
    try {
        const result = await serviceContacts.addContact(req.body);
        res.status(201).json(result);
    } catch (error) {
        next(error)
    };
};

export default {
    getAll,
    getById,
    add,
};