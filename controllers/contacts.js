
const { v4: uuidv4 } = require('uuid')

const contacts = require("../models/index.js")

const HttpError = require("../helpers/HttpError.js")

const ctrlWrapper = require('../helpers/ctrlWrapper.js')

const getAll = async (req, res) => {
<<<<<<< Updated upstream
    const result = await contacts.listContacts();
=======
    const { _id: owner } = req.user;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    const result = await Contact.find({ owner }, "-createdAt -updatedAt", { skip, limit }).populate("owner", "name email");
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
    const newId = uuidv4();
    const { name, email, phone } = req.body;
    const newContact = {
        id: newId,
        name: name,
        email: email,
        phone: phone
    }
    const result = await contacts.addContact(newContact);
=======
    const { _id: owner } = req.user;
    const result = await Contact.create({ ...req.body, owner });
>>>>>>> Stashed changes
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