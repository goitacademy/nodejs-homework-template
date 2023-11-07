const { errorHttp } = require("../error");
const {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
} = require("../models/contacts");

const { contactShema } = require("../validation/contact");

const getAll = async(res, req, next) => {
    try {
        const result = await listContacts();
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

const getById = async(res, req, next) => {
    try {
        const { contactId } = req.params;
        const contact = await getContactById(contactId);

        if (!contact) {
            next();
        }
        res.status(200).json(contact);
    } catch (error) {
        next(error);
    }
};

const deleteById = async(res, req, next) => {
    try {
        const { contactId } = req.params;
        const contact = await removeContact(contactId);

        if (!contact) {
            next();
        }
        res.status(200).json({ message: "contact deleted" });
    } catch (error) {
        next(error);
    }
};

const add = async(res, req, next) => {
    try {
        const { error } = contactShema.validate(req.body);
        if (error) {
            throw errorHttp(400, "missing required name field");
        }
        const newContact = await addContact(req.body);
        res.status(201).json(newContact);
    } catch (error) {
        next(error);
    }
};

const updateById = async(res, req, next) => {
    try {
        const { error } = contactShema.validate(req.body);
        if (error) {
            throw errorHttp(400, "missing required name field");
        }
        if (!req.body) {
            throw errorHttp(400, "missing fields");
        }
        const { contactId } = req.params;
        const contact = await updateContact(contactId, req.body);
        if (contact) {
            res.status(200).json(contact);
        }
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAll,
    getById,
    deleteById,
    add,
    updateById,
};