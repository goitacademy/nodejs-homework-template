const {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
} = require('../models/contacts');

const { HttpError } = require("../helpers");

const Joi = require("joi");

const addShema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
});

const get = async (req, res, next) => {
    try {
        const result = await listContacts();
        res.json(result);
    } catch (error) {
        next(error);
    }
};
const getById = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const result = await getContactById(contactId);
        console.log(result);
        if (!result) {
            throw HttpError(404, "Not found");
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
}

const create = async (req, res, next) => {
    try {
        const { error } = addShema.validate(req.body);
        if (error) {
            throw HttpError(400, "missing required name field");
        }
        const result = await addContact(req.body);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
}

const update = async (req, res, next) => {
    try {
        const { error } = addShema.validate(req.body);
        if (error) {
            throw HttpError(400, "missing field");
        }
        const { contactId } = req.params;
        const result = await updateContact(contactId, req.body);
        if (!result) {
            throw HttpError(404, "Not Found");
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
};

const remove = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const result = await removeContact(contactId);
        if (!result) {
            throw HttpError(404, "Not Found");
        }
        res.json({
            message: "contact deleted",
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    get,
    getById,
    create,
    update,
    remove
};