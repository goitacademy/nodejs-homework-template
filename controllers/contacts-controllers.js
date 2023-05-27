const contacts = require("../models/contacts");
const { HttpError } = require("../helpers");
const { addSchema } = require("../schemas");
const { ctrlWrapper } = require("../decorators")

const getAllContacts = async (req, res) => {
    const result = await contacts.listContacts();

    res.status(200).json(result);
};

const getContactById = async (req, res) => {
    const { id } = req.params;
    const result = await contacts.getContactById(id);
    if (!result) {
        throw HttpError(404, "Not found");
    }

    res.status(200).json(result);

};

const addContact = async (req, res) => {
    const { error } = addSchema.validate(req.body);
    if (error) {
        throw HttpError(400, "missing required field");
    }
    const { name, email, phone } = req.body;
    const result = await contacts.addContact(req.body);

    res.status(201).json(result);
};

const removeContactById = async (req, res) => {
    const { id } = req.params;
    const result = await contacts.removeContact(id);

    if (!result) {
        throw HttpError(404, "Not found");
    }

    res.status(200).json({ "message": "contact deleted" });
};

const updateContactById = async (req, res) => {
    const { error } = addSchema.validate(req.body);
    if (error) {
        throw HttpError(400, "missing fields");
    }
    const { id } = req.params;
    const result = await contacts.updateContact(id, req.body);
    if (!result) {
        throw HttpError(404, "Not found");
    }

    res.json(result);
};

module.exports = {
    getAllContacts: ctrlWrapper(getAllContacts),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    removeContactById: ctrlWrapper(removeContactById),
    updateContactById: ctrlWrapper(updateContactById),
}