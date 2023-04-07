const { ctrlWrapper } = require("../utils");
const {Contact}= require("../models/contacts");
const httpError = require("../helpers/httpError");

async function getContacts(req, res) {
        const result = await Contact.find();
        res.status(200).json(result);
    }

async function getContactId(req, res) {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
    if(!result) {
    throw httpError.HttpError(404, `Not found`);
    }
    res.status(200).json(result);
}


async function addContact(req, res) {
    const result = await Contact.create(req.body);
    res.status(201).json(result);
}

async function deleteContactId(req, res) {
    const {contactId} = req.params;
    const result = await Contact.findByIdAndDelete(contactId);
    if(!result) {
    throw httpError.HttpError(404, `Not found`);
    }
    res.status(200).json(
    {message: "contact deleted"}
    )
}

async function putContactId(req, res) {
    const {contactId} = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
    if(!result) {
    throw httpError.HttpError(404, `Not found`);
    }
    res.status(200).json(result);
}

const updateFavoriteById = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
    if (!result) {
        throw httpError.HttpError(404, `Contact with ${contactId} not found`);
    }
    res.status(200).json(result);
}

module.exports = {
    getContacts: ctrlWrapper(getContacts),
    getContactId: ctrlWrapper(getContactId),
    addContact: ctrlWrapper(addContact),
    deleteContactId: ctrlWrapper(deleteContactId),
    putContactId: ctrlWrapper(putContactId),
    updateFavoriteById: ctrlWrapper(updateFavoriteById),
};