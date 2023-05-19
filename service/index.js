const Contact = require('./schemas/contacts');

const getAllContacts = async () => {
    return Contact.find();
};

const getContactById = (id) => {
    return Contact.findOne({ _id: id });
};

const createContact = (body) => {
    return Contact.create(body);
};

const updateContact = (id, body) => {
    return Contact.findByIdAndUpdate({ _id: id }, body, {new: true});
};

const deleteContact = (id) => {
    return Contact.findByIdAndRemove({ _id: id });
};

module.exports = {
    getAllContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact
};