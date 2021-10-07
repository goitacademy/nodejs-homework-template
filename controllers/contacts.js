const { NotFound } = require('http-errors');
const { sendSuccessfulRes } = require('../helpers');
const { Contact } = require('../models');


const listContacts = async (req, res) => {
    const result = await Contact.find({}, '_id name email phone favorite');
    sendSuccessfulRes(res, { result });
};

const getContactById = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId, '_id name email phone favorite');
    if (!result) {
        throw new NotFound(`Contact with ${contactId} id was not found`);
    }
    sendSuccessfulRes(res, { result });
};

const addContact = async (req, res) => {
    const result = await Contact.create(req.body);
    sendSuccessfulRes(res, { result }, 201);
};

const removeContact = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndDelete(contactId);
    if (!result) {
        throw new NotFound(`Contact with ${contactId} id was not found`);
    }
    sendSuccessfulRes(res, { message: `Contact with ${contactId} id was deleted.` });
};

const updateContact = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
    if (!result) {
        throw new NotFound(`Contact with ${contactId} id was not found`);
    }
    sendSuccessfulRes(res, { result });
};

const updateFavoriteStatus = async (req, res) => {
    const { contactId } = req.params;
    const { favorite } = req.body;
    const result = await Contact.findByIdAndUpdate(contactId, {favorite}, {new: true});
    if (!result) {
        throw new NotFound(`Contact with ${contactId} id was not found`);
    }
    sendSuccessfulRes(res, { result });
};

module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact,
    updateFavoriteStatus
}
