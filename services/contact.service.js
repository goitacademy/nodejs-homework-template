const { Contact } = require('../models/contact');


const listContacts = async (query) => {
    const { page, limit } = query;
    const skipped = (page - 1) * limit;
    const skip = skipped < 0 ? 0 : skipped;


    return Contact.find({}, {}, {skip, limit: +limit})
        .populate('owner', 'email subscription');
};

const getContactById = async (id) => {
    return Contact.findById(id);
};

const addContact = async (contact, id) => {
    return Contact.create({...contact, owner: id});
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

