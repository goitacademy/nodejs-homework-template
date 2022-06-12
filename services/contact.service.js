const { Contact } = require('../models/contact');


const listContacts = async () => {
    return Contact.find({}, {}, {});
};

const getContactById = async (id) => {
    return Contact.findById(id);
};

const addContact = async (contact) => {
    return Contact.create(contact);
};

const updateContact = async (id, contact) => {
    return Contact.findByIdAndUpdate(id, contact, { new: true });
};

const removeContact = async (id) => {
    return Contact.findByIdAndDelete(id);
};

const updateFavorite = async (id, contact) => {
    return Contact.findByIdAndUpdate(id, contact, { new: true });
};

module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact,
    updateFavorite
};

