const HttpError = require('../helpers');
const ctrlWrapper = require('../decorators');
const contactsService = require('../models/contacts');


const getAllContacts = async (req, res) => {
    const result = await contactsService.getAllContacts();
    res.json(result);
};

const getContactById = async (req, res) => {
    const { id } = req.params;
    const result = await contactsService.getContactById(id);
    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.json(result);
};

const addContact = async (req, res) => {
    const result = await contactsService.addContact(req.body);
    res.status(201).json(result);
};

const removeContact = async (req, res) => {
    const { id } = req.params;
    const result = await contactsService.removeContact(id);
    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.json({ "message": "contact deleted" });
};

const updateContact = async (req, res) => {
    const { id } = req.params;
    const result = await contactsService.updateContact(id, req.body);
    if (!result) {
        throw HttpError(404, "Not found")
    }
    res.json(result);
};

module.exports = {
    getAllContacts: ctrlWrapper(getAllContacts),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    removeContact: ctrlWrapper(removeContact),
    updateContact: ctrlWrapper(updateContact),
};