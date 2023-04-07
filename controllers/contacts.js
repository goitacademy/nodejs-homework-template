const { ctrlWrapper } = require("../utils");

const contacts = require("../models/contacts");

const { HttpError } = require("../helpers");

const listContacts = async (req, res) => {
    const result = await contacts.listContacts();
    res.json(result);
}

const getById = async (req, res) => {
    const { id } = req.params;
    const result = await contacts.getById(id);
    if (!result) {
        throw HttpError(404);
    }
    res.json(result);
};

const addContact = async (req, res) => {
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
}

const updateContact = async (req, res) => {
    const { id } = req.params;

    if (Object.keys(req.body).length===0 || req.body === null || req.body === undefined) {

        throw HttpError(400);

    }

    const result = await contacts.updateContact(id, req.body);
    if (!result) {
        throw HttpError(404);
    }
    res.status(200).json(result);
}

const removeContact = async (req, res) => {
    const { id } = req.params;
    const result = await contacts.removeContact(id);
    if (!result) {
        throw HttpError(404);
    }

    res.json({
        message: "contact deleted"
    })
}

module.exports = {
    listContacts: ctrlWrapper(listContacts),
    addContact: ctrlWrapper(addContact),
    getById: ctrlWrapper(getById),
    updateContact: ctrlWrapper(updateContact),
    removeContact: ctrlWrapper(removeContact),
}