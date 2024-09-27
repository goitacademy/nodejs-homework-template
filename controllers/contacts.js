const contacts = require('../models/contacts');

const { HttpError, ctrlWrapper } = require("../helpers");

const getAllContacts = async (req, res) => {
        const result = await contacts.listContacts();
        res.send(result);
};

const getContactById = async (req, res) => {
    const { id } = req.params;
    const result = await contacts.getContactById(id);
    if (!result) {
        throw HttpError(404, "Not found");
    };
    res.send(result);
};

const addContact = async (req, res) => {
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
};

const updateContactById = async (req, res) => {
    if (JSON.stringify(req.body) === '{}') {
        throw HttpError(400, "Missing fields");
    }
    const { id } = req.params;
    const result = await contacts.updateContact(id, req.body);
    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.send(result);
};

const deleteContactById = async (req, res) => {
    const { id } = req.params;
    const result = await contacts.removeContact(id);
    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.status(200).json({ message: "Contact deleted" });
};

module.exports = {
    getAllContacts: ctrlWrapper(getAllContacts),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    updateContactById: ctrlWrapper(updateContactById),
    deleteContactById: ctrlWrapper(deleteContactById),
};