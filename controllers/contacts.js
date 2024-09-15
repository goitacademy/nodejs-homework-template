
const { v4: uuidv4 } = require('uuid')

const contacts = require("../models/index.js")

const HttpError = require("../helpers/HttpError.js")

const ctrlWrapper = require('../helpers/ctrlWrapper.js')

const getAll = async (req, res) => {
    const result = await contacts.listContacts();
    res.status(200).json(result);
}

const getById = async (req, res) => {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId)
    if (!result) {
        throw HttpError(404, "Not found")
    }
    res.json(result);
}

const addContact = async (req, res) => {
    const newId = uuidv4();
    const { name, email, phone } = req.body;
    const newContact = {
        id: newId,
        name: name,
        email: email,
        phone: phone
    }
    const result = await contacts.addContact(newContact);
    res.status(201).json(result);
}

const deleteContact = async (req, res) => {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
        throw HttpError(404, "Not found")
    }
    res.status(201).json({
        message: "contact deleted"
    })
}

const updateContact = async (req, res) => {
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    if (!result) {
        throw HttpError(404, "Not found")
    }
    res.status(200).json(result);
}

module.exports = {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    addContact: ctrlWrapper(addContact),
    deleteContact: ctrlWrapper(deleteContact),
    updateContact: ctrlWrapper(updateContact)
}