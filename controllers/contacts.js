const contacts = require("../models/contacts");

const wrapper = require("../helpers/Wrapper");
const httpError = require("../helpers/HttpError");

const getListContacts = async (req, res, next) => {
    const result = await contacts.listContacts();
    res.json(result);
};

const getContactById = async (req, res) => {
    const result = await contacts.getContactById(req.params.contactId);
    if (!result) {
        throw httpError(404, "Not found");
    }
    res.json(result);
};

const addContact = async (req, res) => {
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
};

const removeContact = async (req, res) => {
    const result = await contacts.removeContact(req.params.contactId);
    if (!result) {
        throw httpError(404, "Not found");
    }
    res.status(200).json({ message: "Contact deleted" });
};

const updateContact = async (req, res) => {
    const result = await contacts.updateContact(req.params.contactId, req.body);
    if (!result) {
        throw httpError(404, "Not found");
    }
    res.json(result);
};

module.exports = {
    listContacts: wrapper(getListContacts),
    getContactById: wrapper(getContactById),
    addContact: wrapper(addContact),
    removeContact: wrapper(removeContact),
    updateContact: wrapper(updateContact),
};