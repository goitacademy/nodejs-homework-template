const Contact = require('./contactShema')

const listContacts = async () => {
        const contactList = await Contact.find();
        return contactList;
};

const getContactById = async (contactId) => {
        const contact = await Contact.findById(contactId)
        return contact;
};

const removeContact = async (contactId) => {
        const contact = await Contact.findByIdAndDelete(contactId)
        return contact;
};

const addContact = async (body) => {
        const newContact = await Contact.create({...body});
        return newContact;
};

const updateContact = async (contactId, body) => {
        const updatedContact = await Contact.findByIdAndUpdate(contactId, {$set: {...body}}, { new: true })
        return updatedContact;
};

const updateContactFavorite = async (contactId, body) => {
        const { favorite } = body;
        const updatedContact = await Contact.findByIdAndUpdate(contactId, {$set: {favorite}})
        return updatedContact;
}; 

module.exports = {
        listContacts,
        getContactById,
        removeContact,
        addContact,
        updateContact,
        updateContactFavorite
};
