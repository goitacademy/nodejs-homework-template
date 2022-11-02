const Contact = require('../models/contact');
const {RequestError} = require("../helpers");

const getAllContacts = async () => {
    const result = await Contact.find();
    return result;
};

const getContactById = async (contactId) => {
    const result = await Contact.findById(contactId);
        if(!result) {
            throw RequestError(404, "Not found")
        }
    return result;
};

const addContact = async (body) => {
    const result = await Contact.create(body);
    return result;
};

const changeContactById = async (contactId, body) => {
    const result = await Contact.findByIdAndUpdate(contactId, body);
        if(!result) {
            throw RequestError(404);
        }
    const upDatedContact = await Contact.findById(contactId);
    return upDatedContact;
};

const deleteContactById = async (contactId) => {
    const result = await Contact.findByIdAndRemove(contactId);
        if(!result) {
            throw RequestError(404)
        }
};

const updateFavoriteById = async (contactId, body) => {
    if(Object.keys(body).length === 0) {
        throw RequestError(400);
    }
    const result = await Contact.findByIdAndUpdate(contactId, {$set: body});
        if(!result) {
            throw RequestError(404);
        }
    const upDatedContact = await Contact.findById(contactId);
    return upDatedContact;
};

module.exports = {
    getAllContacts,
    getContactById,
    addContact,
    changeContactById,
    deleteContactById,
    updateFavoriteById,
}