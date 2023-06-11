const Contact = require("./schema");

const getAllContacts = async () => {
    return Contact.find();
};

const getContactById = async (contactId) => {
    return Contact.findById({_id: contactId});
};

const removeContact = async (contactId) => {
    return Contact.findByIdAndRemove({_id: contactId});
};

const createContact = async (body) => {
    return Contact.create(body);
};

const updateContact = async (contactId, body) => {
    return Contact.findByIdAndUpdate({_id: contactId}, body, { new: true});
};

const updateStatusContact = async (contactId, favorite) => {
    const contact = Contact.findById({_id: contactId});
        if(!contact) {
            return null;
        }
    contact.favorite = favorite;
        return await contact.save;
};
    

module.exports = {
    getAllContacts,
    getContactById,
    removeContact,
    createContact,
    updateContact,
    updateStatusContact,
};