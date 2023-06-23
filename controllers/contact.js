const { RequestError, ctrlWrapper } = require("../helpers");

const contacts = require("../models/contacts");

const getAll = async (req, res, next) => {
    const result = await contacts.listContacts();
    res.json(result);
};

const getById = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
        throw new RequestError(404, "Not found");
    }
    res.json(result);
};

const add = async (req, res, next) => {
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
};
const update = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    if (!result) {
        throw new RequestError(404, "Not found");
    }
    res.json(result);
};

const deleteById = async (req, res) => {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
        throw new RequestError(404, "Not found");
    }

    res.json({
        message: "Delete success",
    });
};

module.exports = {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
    update: ctrlWrapper(update),
    deleteById: ctrlWrapper(deleteById),
};